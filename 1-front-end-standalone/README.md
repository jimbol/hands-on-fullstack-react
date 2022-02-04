# Front-End Standalone
This application uses React and Redux Toolkit to make a fully functioning Blog app that can run locally on your machine.

## Practice
Challenge yourself by trying to create your own front-end application from scratch.

- Create module folder structure
- Design your data structures
- Create the router with stubbed pages
- Create Redux Toolkit slices for your data
- Create your other components and connect them to your Redux data store.

## Installation
### `yarn install`
Installs dependencies from the package.json file. You may run `npm install` instead.

## Starting From Scratch
If you would like to start a new project from scratch, create a working folder and start your react project in that folder.
```
npx create-react-app .
```

To use the same tools used in class run the following installation scripts.
```
yarn add @reduxjs/toolkit react-redux react-router-dom@6 history@5 @mui/material @emotion/react @emotion/styled uuid
```

Now you're ready to start building from scratch.

## Plan Data Structures
We are creating a blog. The elements of are pretty straight-forward. You have `users` and `posts`. If you want to add comments you would also include a `comments` data type, but lets stick with the core use case.

Designing datastructures is a key part of software engineering. Take time to consider how the data structure will be used and what odd use cases may come up down the road.

I'll use typescript to lay out the data structures. I like Typescript for this because its explicit and can be used if you start using Typescript.

```es6
interface Post {
  id: string;
  title: string;
  body: string;

  // Dates that we can display
  createdAt: Date;
  updatedAt: Date;

  // If we want to add tags
  tags: string[]; // string[] indicates a list of strings.
}

interface User {
  id: string;
  username: string;
}

```
