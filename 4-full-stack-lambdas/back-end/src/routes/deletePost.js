import * as Post from '../db/postModel';
import { getUserSub } from './getUserSub';

export const deletePost = {
  method: 'delete',
  path: '/post/:id',
  handler: async (req, res) => {
    const id = req.params.id;

    const post = await Post.getOne(id);
    let userSub = getUserSub(req);

    if (post.owner && post.owner !== userSub) {
      return res.status(403).send({
        message: 'You do not have permission to modify that record.'
      });
    }

    await Post.deleteOne(id);
    res.status(200).send({
      deleted: true,
    });
  },
};
