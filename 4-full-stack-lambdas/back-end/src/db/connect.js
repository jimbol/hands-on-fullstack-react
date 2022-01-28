import { MongoClient } from 'mongodb';
import aws from 'aws-sdk';

let dbClient = null;

export const connect = async () => {
  if (dbClient) {
    return dbClient;
  }

  let dbuser;
  let dbpass;

  try {
    const result = await (new aws.SSM())
      .getParameters({
        Names: ["dbuser", "dbpass"].map(secretName => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();

    const { Parameters } = result;

    dbuser = Parameters.find(({ Name }) => Name === process.env.dbuser);
    dbpass = Parameters.find(({ Name }) => Name === process.env.dbpass);
  } catch(e) {
    dbuser = process.env.dbuser;
    dbpass = process.env.dbpass;
  }

  const url = `mongodb://${dbuser}:${dbpass}@3.17.147.6/blog`;
  console.log(url);
  try {
    console.log(`Connecting to mongo db at ${url}`);
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true, // new url parser
      useUnifiedTopology: true, // new connection engine
      maxPoolSize: 10 // how many connections can be made
    });
    dbClient = client;
    console.log(`Connected to mongo db at ${url}`);
    return dbClient;
  } catch(e) {
    console.log(e);
    dbClient = null;
  }

};

const getDB = async (dbName) => {
  if (!dbClient) {
    throw new Error('Must call "connect" before calling getDB.')
  }
  return dbClient.db(dbName);
};

export const collection = async (collectionName) => {
  const db = await getDB('blog');
  const collection = await db.collection(collectionName);
  return collection;
};
