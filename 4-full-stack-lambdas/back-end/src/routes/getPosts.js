import * as Post from '../db/postModel';

export const getPosts = {
  method: 'get',
  path: '/posts',
  handler: async (req, res) => {
    const posts = await Post.getAll();

    res.status(200);
    res.send({ posts });
  },
};
