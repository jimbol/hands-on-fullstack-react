# Bring APIs to Lambdas
## Why Lambdas?
- Lambdas scale with automatically.
- If there is a crash it will heal automatically.
- You dont have to manage servers like EC2.
- They are on-demand and are only created when needed.

AWS makes it easy to deploy Lambdas using AWS Amplify.

## Prepare codebase
If you're following along with the tutorial you will have a `front-end` and `back-end` folder. In this section we will combine the two into a single application folder. Bring the contents of the `front-end` folder out to your top level. Your new folder structure should look something like this:

```
/
  /back-end
  /public
  /src
  package.json
  ...etc
```

Ok now lets get AWS Amplify up and running.

## Set up
Install the CLI
```
npm install -g @aws-amplify/cli
```

Configure the Amplify account. This will require you to have an AWS Account. Follow the instructions in the prompts.
```
amplify configure
```

## Start an Amplify project
```
amplify init
```

This command
- Creates our `amplify` directory where the backend definition is stored as a CloudFormation configuration.
- Adds `aws-exports.js` to the `src` directory. This is how AWS configures Amplify inside your front-end application.
- Modifies the .gitignore file to handle the new files created
- A cloud project is created that you can access by running `amplify console`.

## Create a Lambda function
Now we can add an API with Amplify.
```
amplify add api
```

During the prompts
- Select `REST`
- Pick a name for the resource like `blogapi`
- Pick a route. We're going to use `/api` which will handle our entire API.
- Pick a name for the Lambda function.
- Select NodeJS as the runtime
- Select `Serverless ExpressJS function (Integration with API Gateway)` for the function template.

Look at the files created. They look very similar to our own back-end. Lets test it as is.

Run `amplify push` to deploy the function. The url for the function will be displayed after it finishes running. Then you can test it from your command line.

```
curl https://yv6aggdnz6.execute-api.us-east-2.amazonaws.com/dev/api
```

Will result in
```
{"success":"get call succeed!","url":"/api"}
```

## Moving our API to Lambda
We are going to replace the Lambda's src folder with our api. Lets start by preparing our `back-end` folder.
- We need to include a new dependency to allow the Lambda to run ExpressJS `yarn add aws-serverless-express`
- For now lets comment out the DB connection, we will handle the DB connection later
```diff
-- await db.connect(DB_URL);
++ // await db.connect(DB_URL);
```
- Export the express app from `src/index.js`
```es6
export { app };
```

- Create a new `index.js` file to handle the lambda. We will add the dependencies in the next section.
```es6
require("core-js/stable");
require("regenerator-runtime/runtime");
const awsServerlessExpress = require('aws-serverless-express');
const { app } = require('./lib');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
```
- You'll note this file uses require instead of ES6 imports. That is because Lambdas dont handle ES6 imports well. We will use Babel to get past this.

### Babel
Lambdas do not handle ES6 imports very well by default. We need to include Babel to transpile our code down to a version of JS that the Lambda runtime can handle.
- Install Babel: `yarn add -D @babel/core @babel/preset-env core-js regenerator-runtime`
- Create a `babel.config.json` file with the following contents
```json
{
  "presets": ["@babel/preset-env"]
}
```
- Add the following to the `scripts` block of our `package.json`
```
  "build": "babel src -d lib"
```
- This will build into the lib folder, but we need build into the lambda folder.

### Build into the Lambda
- To begin, delete the contents of the lambda `src` folder
- Update the `back-end` build script to copy to the correct folder
```
"build": "yarn install && babel src -d ../amplify/backend/function/blogapi/src/lib && cp index.js ../amplify/backend/function/blogapi/src/index.js&& cp -r node_modules ../amplify/backend/function/blogapi/src/node_modules",
```
- This also moves index.js and node modules into the lambda folder

### Deploy and test
- `amplify push`
- `curl https://YOUR_ID.execute-api.us-east-2.amazonaws.com/dev/api/test`
- If errors arise, we can see them logged on [Cloudwatch](https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2#logsV2:log-groups).

## Allow database connections
### Configure security group
- Modify the inbound rules. Add a Custom TCP rule to port `27017` (MongoDB's port) from `0.0.0.0/0` (the internet). This will open the database to the internet so lets add another level of security

### Add admin user
- SSH into the EC2 instance and run `mongo`
- Run `use blog` to enter the blog database.
- Now we are going to add a database admin user
```js
db.createUser({
  user: 'blog',
  pwd: 'VCNXRA7dhgzekFmKuYmcoQwD!',
  roles: [{ role: 'readWrite', db:'blog' }]
})
```

### Update Mongo Configuration
- Next we need to modify the mongo.conf. Run `sudo vim /etc/mongod.conf`
- As is, only processes running at 127.0.0.1 can access mongo. Lets open that to the internet. Go down to the network interfaces section and make the following change
```diff
# network interfaces
net:
  port: 27017
--  bindIp: 127.0.0.1
++  bindIp: 0.0.0.0
```
- Now we need to edit the security section to allow username/password authorization. This is important because now the database will be accessible from the internet
```diff
# security
++security:
++  authorization: enabled
```
- Finally lets restart mongo `sudo service mongod restart`
- Get the public IP address of the mongodb instance from the AWS Console
- We can test by connecting with the following `mongo -u admin -p VCNXRA7dhgzekFmKuYmcoQwD! PUBLIC_IP_ADDRESS/blog`

### Connect to Mongo from API
- I chose to move the DB connection logic to the where the API handlers are initialized because Lambda may relaunch the express app with each request and the previous approach assumed that we had a long-running server. This is a difference between traditional web-servers and serverless applications.
```diff
--Object.values(routes).forEach((route) => {
--  console.log(route);
--  app[route.method](`/api${route.path}`, route.handler);
--});

++Object.values(routes).forEach((route) => {
++  console.log(route);
++  app[route.method](`/api${route.path}`, (...args) => {
++
++    const connectDB = async () => {
++      await db.connect();
++      return route.handler(...args);
++    };
++
++    return connectDB();
++  });
++});

--const start = async () => {
--  await db.connect(DB_URL);
--  app.listen(port);
--  console.log(`Express started on port ${port}`);
--};

--start();
++app.listen(port, () => {
++  console.log(`Express started on port ${port}`);
++});
```
- Update the API to use the Production database, run locally, and test. It should work
```es6
const DB_URL = `mongodb://MONGO_USER:MONGO_PASSWORD@3.17.147.6/blog`;
```
- Run `amplify push` and test in Production. It should work

### Secrets
- We dont want to store our user and password in source control. AWS Amplify lets us add secrets
- Install the aws-sdk: `yarn add aws-sdk`
- Update the function
```
amplify update function
```
- Select the function you want to edit
- Select "Secret values configuration" and follow the prompts to store the username and password. These are stored secretly in AWS and get passed as evironment variables when the lambdas run.
- Include these environment variables in the code with
```es6
const DB_URL = `mongodb://${process.env.dbuser}:${process.env.dbpass}@3.17.147.6/blog`;
```
- You can run locally like so
```
dbuser=blog dbpass=VCNXRA7dhgzekFmKuYmcoQwD! yarn start
```

## Connect Front-End
Lets update the front end to connect. Inside the api file, update the base path like so:
```
const basePath = `${process.env.REACT_APP_API_PATH}/api`;
```
React Scripts will look for the environment values preceeded with `REACT_APP` and include them in the project. In our package.json we can include the env variable like so:
```
"start": "REACT_APP_API_PATH=\"http://localhost:5000\" react-scripts start",
```
Next, look up the url for the lambda functions. For me it was `https://yv6aggdnz6.execute-api.us-east-2.amazonaws.com/dev`. Lets add a new command to use that url locally.
```
"start:prod": "REACT_APP_API_PATH=\"https://yv6aggdnz6.execute-api.us-east-2.amazonaws.com/dev\" react-scripts start",
```
Finally we need to include the variable in the build script.
```
"build": "REACT_APP_API_PATH=\"https://yv6aggdnz6.execute-api.us-east-2.amazonaws.com/dev/api/\" react-scripts build",
```

## Deploy to Netlify
### 1. Deploy to Netlify
Create a free Netlify account and follow the instructions to set up a project from Github. Its super easy.

There are a couple changes we will have to make once deployed.

### 2. Add the Netlify to the CORS section of the back-end
```
amplify update function
```
Select the function you want to edit, and the select that you want to add an evironment variable. We will call it `client` and the value will be the Netlify app url.

Deploy and visit your Netlify site. API requests should work

### 3. Redirects
Right now visiting a sub-route such as `/create-post` will show a 404 page. This is because our application is a "single page web application" and Netlify is looking for an actual html file at that route. We need to tell Netlify that all routes should be routed to `index.html`

Create a file in the `/public` directory called `_redirects` and populate it with the following.
```
/* /index.html 200
```
This tells Netlify to take all traffic (`/*`) and route it to `index.html` with a status code of 200.

Push the changes, let Netlify deploy, and test. It should work!
