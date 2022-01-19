import { ObjectId } from 'mongodb';
import { collection } from './connect'

export const insertOne = async (post) => {
  const posts = await collection('posts');
  return await posts.insertOne(post);
}

export const getAll = async () => {
  const posts = await collection('posts');
  return await posts.find({}).toArray();
};

export const getOne = async (postId) => {
  const posts = await collection('posts');
  return await posts.findOne({ _id: ObjectId(postId) });
};

export const deleteOne = async (postId) => {
  const posts = await collection('posts');
  return await posts.deleteOne({ _id: ObjectId(postId) });
};

export const updateOne = async (postId, updates) => {
  const posts = await collection('posts');
  const result = await posts.updateOne(
    { _id: ObjectId(postId) },
    {
      $set: updates,
    }
  );
  return result;
};
