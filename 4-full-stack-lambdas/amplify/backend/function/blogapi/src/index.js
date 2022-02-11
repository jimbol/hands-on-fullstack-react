/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["dbuser","dbpass","allowed_client"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
require("core-js/stable");
require("regenerator-runtime/runtime");
const awsServerlessExpress = require('aws-serverless-express');
const { app } = require('./lib');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`handler called`);
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

