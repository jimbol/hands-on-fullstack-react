import * as Post from '../db/postModel';

export const getPost = {
  method: 'get',
  path: '/post/get/:id',
  handler: async (req, res) => {
    const id = req.params.id;

    const post = await Post.getOne(id);

    res.status(200);
    res.send({ posts: [post] });
  },
};
