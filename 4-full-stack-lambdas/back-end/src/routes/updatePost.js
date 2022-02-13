import * as Post from '../db/postModelDynamo';

export const updatePost = {
  method: 'put',
  path: '/post/:id',
  handler: async (req, res) => {
    const postUpdates = req.body.post;
    const id = req.params.id;

    await Post.updateOne(id, postUpdates);

    const posts = await Post.getAll();

    res.status(200).send({
      posts,
    });
  },
};
