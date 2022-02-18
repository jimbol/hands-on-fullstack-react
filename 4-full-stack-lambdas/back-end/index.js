require("core-js/stable");
require("regenerator-runtime/runtime");
const awsServerlessExpress = require('aws-serverless-express');
const { app } = require('./build');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

