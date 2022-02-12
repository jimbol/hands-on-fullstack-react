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
#### 3. Deploy Amplify
```
cd front-end && amplify push
```

#### Improving this flow
Options for improvement include
- Moving Amplify into the outside scope
- Moving the back-end folder into the front-end folder
- Creating an outside makefile to orchestrate both builds

## Practice
Challenge yourself by creating your own lambdas.

- Move you api to lambdas
- Connect your lambdas to your Database
