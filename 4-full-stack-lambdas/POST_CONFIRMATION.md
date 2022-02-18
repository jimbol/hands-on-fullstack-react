# Create user records with post confirmation hook
Cognito provides event triggers for various steps in the user creation process. You can trigger lambda functions for those events.

Let's say we want to add a user record when someone finishes creating a new account. We can trigger a lambda from the postconfirmation hook.

To start we call:
```amplify update auth```

Select `Walkthrough all the auth configurations`
Select `User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and more)`
*Enter a name for your identity pool.* Select a name
Don't allow unauthenticated logins.
Don't enable 3rd party auth.
*Do you want to add User Pool Groups?* Select `No`
*Do you want to add an admin queries API?* Select `No`
*Multifactor authentication (MFA) user login options:* Select `Off`
Set up email verification.
*Do you want to override the default password policy for this User Pool?* Select `No`
*Specify the app's refresh token expiration period (in days):* `30`
*Do you want to specify the user attributes this app can read and write? *`N`
*Do you want to enable any of the following capabilities?* Press `Enter` to skip
*Do you want to use an OAuth flow?* `No`
*Do you want to configure Lambda Triggers for Cognito?* `Y`
Select `Post Confirmation` with spacebar, then press enter. This get triggered after a user is confirmed.
Select `Create your own module` with spacebar, then press enter. This will add a function.
*Do you want to edit your custom function now? *`Y`

You'll get access to the lambda code. We'll have to set up our Babel build process to really get this running. Add a new file under back-end/src called `postConfirmation.js`.

```es6
import * as User from './db/userModel';
import * as db from './db/connect';

export const handler = async (event, context, callback) => {
  await db.connect();

  const user = {
    sub: event.request.userAttributes.sub,
    email: event.request.userAttributes.email,
    createdAt: new Date(),
  };

  await User.insertOne(user);

  callback(null, event);
};

```

We'll have to make a user model too. It will be exactly the same as our Post model, except everywhere it said "post", write "user" instead".

In the postconfirmation function definition, lets add a index.js that pulls in our post confirmation handler from a build folder, we'll add the build folder in a minute.

```es6
require("core-js/stable");
require("regenerator-runtime/runtime");
exports.handler = (event, context, callback) => {
  const { handler } = require('./build/postConfirmation.js');
  return handler(event, context, callback);
}
```

Then we can add another build script, similar to the one we created for the Express app.
```
cd back-end && yarn build
cp -r back-end/build front-end/amplify/backend/function/4fullstacklambdascc18ef0cPostConfirmation/src
cp -r back-end/node_modules front-end/amplify/backend/function/4fullstacklambdascc18ef0cPostConfirmation/src
```

Note that your path will be different depending on your project.

We have to add the dbuser and dbpass secrets too.

Once all that is set, deploy and create a new user to test. A user record should be created after confirming the new account.

[Next Steps](DYNAMO_DB.md) - Switch to Dynamo DB
