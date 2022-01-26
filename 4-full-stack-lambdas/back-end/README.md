# Back-end with no database
This folder implements our Blog api with a mongo database stored on EC2

## Installation
### `yarn install`
You can run `npm install` instead.

### Start from scratch
First create a new project
```yarn init .```
or
```npm init```

Then install dependencies
```yarn add express uuid```
```npm install express uuid```

The `start-dev` script in `package.json` uses Nodemon to keep the local environment running while code changes. Install Nodemon like so:
```npm install --global nodemon```

## Practice
Challenge yourself by creating your own lambdas.

- Move you api to lambdas
- Connect your lambdas to your Database
