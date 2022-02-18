
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
