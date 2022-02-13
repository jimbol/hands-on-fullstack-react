import * as Post from '../db/postModelDynamo';

export const getPosts = {
  method: 'get',
  path: '/posts',
  handler: async (req, res) => {
    console.log('get posts from dynamodb');
    const posts = await Post.getAll();

    res.status(200);
    res.send({ posts });
  },
};
