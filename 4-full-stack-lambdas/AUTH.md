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

Yes its really that easy to set up the auth infrastructure! This sets up AWS Cognito. Next we'll use Amplify to update the UI.

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

## Access user info in Lambdas
First off we need to modify the frontend to include the Authorization token. Using amplify's request tooling will enable this.

In `src/modules/api.js`, modify to use amplify's request tooling

```es6
import { API as amplifyAPI } from 'aws-amplify';

const basePath = '/api';

export const API = async(method, path, payload) => {
  const url = `${basePath}${path}`;

  const apiName = 'blogapi';

  const options = {};

  if (payload) options.body = payload;

  const response = await amplifyAPI[method.toLowerCase()](apiName, url, options);
  return response;
}
```

Then, in the back-end src/index.js file, add middleware to include Lambda context in the Express req argument.
```es6
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
// ...
app.use(awsServerlessExpressMiddleware.eventContext());
```

With cognito, the main user id is call `sub` (subject). We can now access this id on the req object. Its a deep look up but surprisingly this seems to be the standard way to get the sub id.

```es6
let userSub = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1]
```

This id gets added by the authorizor in API gateway so can be relied upon to be valid. We can use this to allow or block access to records.

For example, we can add an owner to records when they are created:

```es6
const newPost = req.body.post;
newPost.owner = userSub;

const { insertedId } = await Post.insertOne(newPost);
```

And then use that id to determine if a requesting user is the owner.

```es6
const post = await Post.getOne(id);
let userSub = getUserSub(req);

if (post.owner && post.owner !== userSub) {
  return res.status(403).send({
    message: 'You do not have permission to modify that record.'
  });
}
```

[Next Steps](POST_CONFIRMATION.md) - Create user records with post confirmation hook
