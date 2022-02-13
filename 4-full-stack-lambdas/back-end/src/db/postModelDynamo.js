import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.STORAGE_BLOGDYNAMODB_NAME;

export const insertOne = async (post) => {
  const id = uuid();
  post.id = id;

  const params = {
    TableName: tableName,
    Item: post
  };

  await docClient.put(params).promise();
  console.log('inserted:', id);

  const posts = await docClient.scan(params).promise();
  console.log(posts);

  return { insertedId: id };
}

export const getAll = async () => {
  const params = {
    TableName: tableName,
  };

  console.log('about to getAll posts');
  const posts = await docClient.scan(params).promise();
  console.log(posts);
  return posts.Items;
};

export const getOne = async (postId) => {
  console.log('GET ONE');
  const params = {
    TableName: tableName,
    Key: {
      id: postId,
    },
  };

  const post = await docClient.get(params).promise();

  return post.Item;
};

export const deleteOne = async (postId) => {
  const params = {
    TableName: tableName,
    Key: {
      id: postId,
    },
  };

  return await docClient.delete(params).promise();
};

export const updateOne = async (postId, updates) => {
  const params = {
    TableName: tableName,
    Key:{
      id: postId,
    },
    UpdateExpression: "set ",
    ExpressionAttributeValues: {},
    ReturnValues:"UPDATED_NEW"
  };

  const updateExpressionArray = [];

  if (updates.title) {
    params.ExpressionAttributeValues[':title'] = updates.title;
    updateExpressionArray.push('title = :title');
  }

  if (updates.body) {
    params.ExpressionAttributeValues[':body'] = updates.body;
    updateExpressionArray.push('body = :body');
  }

  params.UpdateExpression += updateExpressionArray.join(', ');

  await docClient.update(params).promise();

  return;
};
