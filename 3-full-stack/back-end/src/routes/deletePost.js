import * as Post from '../db/postModel';

export const deletePost = {
  method: 'delete',
  path: '/post/:id',
  handler: async (req, res) => {
    const id = req.params.id;
    await Post.deleteOne(id);
    res.status(200).send({
      deleted: true,
    });
  },
};
