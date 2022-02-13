import * as User from './db/userModel';
import * as db from './db/connect';

export const handler = async (event, context, callback) => {
  await db.connect();

  const newUser = {
    sub: event.request.userAttributes.sub,
    email: event.request.userAttributes.email,
    createdAt: new Date(),
  };

  await User.insertOne(newUser);

  return callback(null, event);
};
