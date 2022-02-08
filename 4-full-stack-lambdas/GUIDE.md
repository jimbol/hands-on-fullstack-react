## Add Netlify hosting
We can deploy to Netlify but run into complications down the line when doing so. Specifically, the aws-exports file needs to be generated at build-time which involves some additional set up. Using Amplify hosting is much easier at that point,.
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

# Add Auth
## Auth Goals
- Allow anyone to SEE posts
- Only authed people can add, edit, delete posts
- If the user isnt signed in, show sign in button. Otherwise show the create post buttons.

## Add auth in amplify
Install the most basic auth installation
```
amplify add auth
```

And deploy!
```
amplify push
```

Yes its really that easy to set up the auth infrastructure!

## Add auth in our front-end
First, add the auth configuration in `App.js`
```es6
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
```

Then for demonstration purposes lets wrapp our App in authentication.

```es6
import { withAuthenticator } from '@aws-amplify/ui-react';
//...
export default withAuthenticator(App);
```
This will add auth to the entire application. Thats not quite what we want though. I want a sign in/up UI.

So now we're going to add a route to a login page and put the authorization UI provided by amplify

In the navigation
```es6
<Button
  onClick={() => navigate('/auth')}
>Sign In/Sign Up</Button>
```
In the router
```es6
<Route path="/auth" element={<Auth />} />
```

Now lets add this new auth page
```es6
import '@aws-amplify/ui-react/styles.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { useDispatch } from 'react-redux';

import { userActions } from '../slices';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

function Auth({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // when logged in dispatch an action to store the user
      dispatch(userActions.signIn(user));
      navigate('/');
    }
  });

  // This will show briefly when logged in
  return (
    <Typography>Authenticated</Typography>
  );
}

export default withAuthenticator(Auth);

```

The `withAuthenticator` function wraps a component in an authenticator. So this component will only show once passing authentication.

We're dispatching a `signIn` action to a `user` reducer that we havent created yet. When a user signs in, set the user in Redux, and then route home.

Now lets add the user slice. Super basic slice here.
```es6
import { createSlice } from "@reduxjs/toolkit"

const initialState = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => action.payload,
    signOut: () => null,
  },
});

export const userActions = userSlice.actions;
export const user = userSlice.reducer;
```

Next, we need to check if the user is authed whenever they access a route. So inside the route, we can add the following:
```es6
import { Auth } from 'aws-amplify';

// ...

useEffect(() => {
  const checkUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (!user) return;
    const { username } = user;
    dispatch(userActions.signIn({
      username,
    }));
  }

  checkUser();
});
```

Now we can ensure that the user state is always up to date.

So lets hide and show some UI based on that. We'll show a sign out button when logged in.
Navagation.js
```es6
const user = useSelector(getUser);
  const dispatch = useDispatch();

  const signOut = async () => {
    await Auth.signOut();
    dispatch(userActions.signOut());
    navigate('/');
  };

  // ...
  // in the component tree
  {user ? (
    <Button
      onClick={() => signOut()}
    >Sign out</Button>
  ) : (
    <Button
      onClick={() => navigate('/auth')}
    >Sign In/Sign Up</Button>
  )}
```

You can create custom login flows using their lower level api. [Take a look](https://docs.amplify.aws/guides/authentication/custom-auth-flow/q/platform/js/)!

Using these tools we can hide and show all necessary components on the front-end, but what about securing the API?

## Add auth in our API
We're going to add an authenticated path to the API. Amplify gives the ability to do this!
```
amplify add api
```
Pick REST
Next, select "Y" to add a new path to an existing API
Select "Add another path".
Provide the path to add auth to. `/api/post`
Pick the Lambda source we have already created, it will use the same express app.
Select "Authenticated users only" for who should have access to those routes.
Next, use the spacebar to select create, update, and delete. Only authed users should be able to do that function.

Now we need to add another route to allow fetching indivitual records.
Provide the path: `/api/post/get/{postid}`
Use the same lambda fn.
This time for "Restrict API access? (Y/n)" select "N".

That path doesn't exist in our application yet so be sure to update the API path and path in the front end.

Now deploy with `amplify push` and view the results in the [API Gateway UI](https://us-east-2.console.aws.amazon.com/apigateway/home?region=us-east-2).

### Publishing to Netlify
We have to include `src/aws-exports.js` in the repository because it is require to configure auth. This file is ignored due to issues running multiple environments. For our example we just have a single env, so we can include it. All the data in the config is available on the client, no secret information is included.

Comment out `aws-exports.js` from `.gitignore`, commit, and push to github.

## Post confirmation hook
`amplify update auth`
https://blog.arturofm.com/amplify-add-user-to-dynamodb-using-a-cognito-post-confirmation-lambda-trigger/

# Creating a scalable database
## Document DB
AWS offers a scalable database that implements a very similary database to Mongo, its called Document DB. It seems like a natural fit for our application but we're not going to use it today for a few reasons.

- It is expensive. You must allocate servers that run continuously.
- It doesn't auto-scale. You have to manually scale when in need.
- It requires that we set up an entire networking environment.

## Dynamo DB
DynamoDB is the main document-style database offered by AWS. Its super fast, super cheap, scales automatically, and doesnt require the maintainence of any servers. Lets see how we can add Dynamo DB to the project.
