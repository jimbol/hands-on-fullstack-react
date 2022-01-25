# Back-end with no database
This folder implements our Blog api without any database. Instead data is stored in memory.

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
Challenge yourself by trying to create your own back-end.

- Create Express server
- Use Postman to test endpoints
- Add routes
- Update the in-memory data within the route handlers
