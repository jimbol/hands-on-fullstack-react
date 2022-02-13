require("core-js/stable");
require("regenerator-runtime/runtime");

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { handler } = require('./build/postConfirmation.js');

  return handler(event, context, callback);
}
