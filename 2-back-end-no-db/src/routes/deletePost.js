import { data } from '../db/data';

export const deletePost = {
  method: 'delete',
  path: '/post/:id',
  handler: (req, res) => {
    const id = req.params.id;
    if (!data.posts[id]) {
      return res.status(404).send({
        message: 'That post does not exit.'
      });
    }

    delete data.posts[id];

    res.status(200).send({
      deleted: true,
    });
  },
};
