# Hands-On Full-Stack React

Welcome to the Repository for the Hands-On Full-Stack React class! I have broken the project into progress steps.

## Week 1
In this lesson we will create a full-stack application locally on our machines. We will go through folders 1 through 3.

- [1-front-end-standalone](/1-front-end-standalone) - Create a working front-end application.
- [2-back-end-no-db](/2-back-end-no-db) - Create a working back-end without a database. Test with Postman.
- [3-full-stack](/3-full-stack) - Create a MongoDB and tie all the pieces together.

### Week 1 Assignment
Using React, Redux Toolkit, ExpressJS, and Mongodb, create a full-stack application locally on your machine.

For help, reference the repository. You are also encouraged to use other resources whenever needed!

## Week 2
In this lesson we will deploy our application to EC2, then we will make our API scalable using Lambdas, API Gateway, and AWS Amplify, and finally we will deploy the front-end to Netlify.

- [3-full-stack](/3-full-stack) - Prepare application to run in EC2
- [3-full-stack/RUN_ON_EC2.md](/3-full-stack/RUN_ON_EC2.md) - Deploy application to EC2
- [4-full-stack-lambdas/LAMBDA_API.md](/4-full-stack-lambdas/LAMBDA_API.md) - Deploy API to Lambdas for scalability
- [4-full-stack-lambdas/NETLIFY_HOSTING.md](/4-full-stack-lambdas/NETLIFY_HOSTING.md) - Deploy front-end to Netlify

### Week 2 Assignment
Create an application that fulfills the following requirements:
- Uses MongoDB running on EC2
- Uses AWS Amplify to run an Express API on AWS Lambdas
- Uses Netlify for front-end hosting

For help, reference the repository. You are also encouraged to use other resources whenever needed!

There was a request to map out the back end deployment flow.

## Deployment flow
The set up I am showing here is a bit strange, so lets walk through the steps to deploy the back end.
#### 1. Build back-end with babel:
```cd back-end && yarn babel src -d lib```
#### 2. Copy back-end into the Amplify folder:
```
cd back-end
cp -r lib ../front-end/amplify/backend/function/blogapi/src/lib
cp index.js ../front-end/amplify/backend/function/blogapi/src/index.js
cp -r node_modules ../front-end/amplify/backend/function/blogapi/src/node_modules
```

The build command in the back-package.json handles steps 1 and 2.
```
"build": "yarn install && babel src -d ../front-end/amplify/backend/function/blogapi/src/lib && cp index.js ../front-end/amplify/backend/function/blogapi/src/index.js&& cp -r node_modules ../front-end/amplify/backend/function/blogapi/src/node_modules",
```
#### 3. Deploy Amplify
```
cd front-end && amplify push
```

#### Improving this flow
Options for improvement include
- Moving Amplify into the outside folder
- Moving the back-end folder into the front-end folder
- Creating an outside makefile to orchestrate both builds

## Week 3
In this lesson we will add authentication, move to a scalable database, add tests, and continuous integration.

- [4-full-stack-lambdas/ADD_AUTH.md](/4-full-stack-lambdas/ADD_AUTH.md) - Add auth to the front- and back-end.
- [4-full-stack-lambdas/DYNAMO_DB.md]](/4-full-stack-lambdas/DYNAMO_DB.md) - Learn about DynamoDB and update our application to use it.
- [4-full-stack-lambdas/TESTING.md](/4-full-stack-lambdas/TESTING.md) - Add basic front- and back-end tests.
- [Continuous integration](../.github/workflows) - Run tests in Github Actions.

