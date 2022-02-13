import { ObjectId } from 'mongodb';
import { collection } from './connect'

export const insertOne = async (user) => {
  const users = await collection('users');
  console.log('collection collected');
  return await users.insertOne(user);
}

export const getAll = async () => {
  const users = await collection('users');
  return await users.find({}).toArray();
};

export const getOne = async (userId) => {
  const users = await collection('users');
  return await users.findOne({ _id: ObjectId(userId) });
};

export const deleteOne = async (userId) => {
  const users = await collection('users');
  return await users.deleteOne({ _id: ObjectId(userId) });
};

export const updateOne = async (userId, updates) => {
  const users = await collection('users');
  const result = await users.updateOne(
    { _id: ObjectId(userId) },
    {
      $set: updates,
    }
  );
  return result;
};
