import * as Post from '../db/postModelDynamo';
import { getUserSub } from './getUserSub';

export const createPost = {
  method: 'post',
  path: '/post',
  handler: async (req, res) => {
    let userSub = getUserSub(req);

    const newPost = req.body.post;
    newPost.owner = userSub;

    const { insertedId } = await Post.insertOne(newPost);

    const posts = await Post.getAll();
    res.status(200);
    res.send({
      posts,
      insertedId,
    });
  },
};
