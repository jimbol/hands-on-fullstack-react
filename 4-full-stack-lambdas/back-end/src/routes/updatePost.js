import * as Post from '../db/postModel';

export const updatePost = {
  method: 'put',
  path: '/post/:id',
  handler: async (req, res) => {
    const postUpdates = req.body.post;
    const id = req.params.id;

    const { matchedCount } = await Post.updateOne(id, postUpdates);
    if (matchedCount === 0) {
      return res.status(404).send({
        message: 'That post does not exit.'
      });
    }

    const posts = await Post.getAll();

    res.status(200).send({
      posts,
    });
  },
};
