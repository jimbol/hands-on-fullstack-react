import * as Post from '../db/postModel';

export const createPost = {
  method: 'post',
  path: '/post',
  handler: async (req, res) => {
    const newPost = req.body.post;
    const { insertedId } = await Post.insertOne(newPost);

    const posts = await Post.getAll();
    res.status(200);
    res.send({
      posts,
      insertedId,
    });
  },
};
