
# Creating a scalable database
## Document DB
AWS offers a scalable database that implements a very similary database to Mongo, its called Document DB. It seems like a natural fit for our application but we're not going to use it today for a few reasons.

- It is expensive. You must allocate servers that run continuously.
- It doesn't auto-scale. You have to manually scale when in need.
- It requires that we set up an entire networking environment.

## Dynamo DB
DynamoDB is the main document-style database offered by AWS. Its super fast, super cheap, scales automatically, and doesnt require the maintainence of any servers. Lets see how we can [add Dynamo DB to the project](https://docs.amplify.aws/guides/functions/integrating-dynamodb-with-lambda/q/platform/js/).

```amplify add storage```

```
? Select from one of the below mentioned services: NoSQL Database

Welcome to the NoSQL DynamoDB database wizard
This wizard asks you a series of questions to help determine how to set up your NoSQL database table.

✔ Provide a friendly name · blogdynamodb
✔ Provide table name · posts

You can now add columns to the table.

✔ What would you like to name this column · title
✔ Choose the data type · string
✔ Would you like to add another column? (Y/n) · yes
✔ What would you like to name this column · body
✔ Choose the data type · string
✔ Would you like to add another column? (Y/n) · yes
✔ What would you like to name this column · owner
✔ Choose the data type · string
✔ Would you like to add another column? (Y/n) · yes
✔ What would you like to name this column · id
✔ Choose the data type · string
✔ Would you like to add another column? (Y/n) · no

Before you create the database, you must specify how items in your table are uniquely organized. You do this by specifying a primary key. The primary key uniquely identifies each item in the table so that no two items can have the same key. This can be an individual column, or a combination that includes a primary key and a sort key.

To learn more about primary keys, see:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey

✔ Choose partition key for the table · id
✔ Do you want to add a sort key to your table? (Y/n) · no
✔ Do you want to add a Lambda Trigger for your Table? (y/N) · no
```

We have to do the same for the users table too.

Now our tables exits (locally) and we have to update the function to have permissions to access it. We will have to modify our api function and our post confirmation function.

```
amplify update function
```

```
? Select the Lambda function you want to update: YOUR_FUNCTION
? Which setting do you want to update? Resource access permissions
? Select the categories you want this function to have access to. storage
? Select the operations you want to permit on blogdynamodb: create, read, update, delete

You can access the following resource attributes as environment variables from your Lambda function
        STORAGE_BLOGDYNAMODB_ARN
        STORAGE_BLOGDYNAMODB_NAME
        STORAGE_BLOGDYNAMODB_STREAMARN

? Do you want to edit the local lambda function now? No
```

We can push these changes with `amplify push`.

## Connect to DynamoDB
Replace our model file.

```es6
import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.STORAGE_BLOGDYNAMODB_NAME;

export const insertOne = async (post) => {
  const id = uuid();
  post.id = id;

  const params = {
    TableName: tableName,
    Item: post
  };

  await docClient.put(params).promise();
  console.log('inserted:', id);

  const posts = await docClient.scan(params).promise();
  console.log(posts);

  return { insertedId: id };
}

export const getAll = async () => {
  const params = {
    TableName: tableName,
  };

  console.log('about to getAll posts');
  const posts = await docClient.scan(params).promise();
  console.log(posts);
  return posts.Items;
};

export const getOne = async (postId) => {
  console.log('GET ONE');
  const params = {
    TableName: tableName,
    Key: {
      id: postId,
    },
  };

  const post = await docClient.get(params).promise();

  return post.Item;
};

export const deleteOne = async (postId) => {
  const params = {
    TableName: tableName,
    Key: {
      id: postId,
    },
  };

  return await docClient.delete(params).promise();
};

export const updateOne = async (postId, updates) => {
  const params = {
    TableName: tableName,
    Key:{
      id: postId,
    },
    UpdateExpression: "set ",
    ExpressionAttributeValues: {},
    ReturnValues:"UPDATED_NEW"
  };

  const updateExpressionArray = [];

  if (updates.title) {
    params.ExpressionAttributeValues[':title'] = updates.title;
    updateExpressionArray.push('title = :title');
  }

  if (updates.body) {
    params.ExpressionAttributeValues[':body'] = updates.body;
    updateExpressionArray.push('body = :body');
  }

  params.UpdateExpression += updateExpressionArray.join(', ');

  await docClient.update(params).promise();

  return;
};

```

There are a couple places on the client-side where we are expecting the `_id` that comes back from MongoDB. So lets convert those to expecting `id` instead.


# Testing
## Front-end
Create React App sets us up with Jest, an excellent test runner with built in assertion libraries, stubs, spies, etc. We can call `yarn test`

Test that the application runs.
```es6
test('That the title is rendered', () => {
  render(<App />);
  const logoElement = screen.getByText('The Nerd Blog');
  expect(logoElement).toBeInTheDocument();
});
```

Stub the Amplify API module to send fake data to the client. This approach can be used in a variety of forms to test various functions of the application. This is essentially an integration test of the front end components. Its a quick way to test that all the pieces are working together as expected.

```es6
import { API } from 'aws-amplify';

// ...

test('Posts are added to the page', () => {
  API.get = jest.fn().mockResolvedValue(
    new Promise((resolve) => resolve({
      "posts":[{
        "owner":"3eb9067d-e937-45fd-ada8-7f2e5ec2ea05",
        "id":"e8762d45-dbae-48d9-896d-1931221bd1c7",
        "body":"3",
        "title":"Nice Post"
      }],
    }))
  );

  render(<App />);
  setTimeout(() => {
    const logoElement = screen.getByText('Nice Post');

    expect(logoElement).toBeInTheDocument();
  }, 0);
});
```
## Back-End
The Back-End will take a little more work. Lets dive in!

Add jest
```
yarn add -D jest
```
Add a script to the package.json to start the tests
```
"test": "jest"
```

Lets add a test of getOne.
```es6
test('getPost returns a post for an ID', async () => {
  const postId = 1;
  const post = {
    id: postId,
    title: 'Test post',
    body: 'Test post body',
  };

  const req = {
    params: {
      id: postId,
    },
  };

  const res = {
    status: jest.fn(),
    send: jest.fn(),
  };

  AWS.DynamoDB.DocumentClient = jest.fn().mockReturnValue({
    get: (params) => ({
      promise: jest.fn().mockResolvedValue({
        Item: params.Key.id === postId ? post : null,
      }),
    }),
  });

  await getPost.handler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledWith({ posts: [post]});
});

```
