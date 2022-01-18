import { data } from '../db/data';

export const updatePost = {
  method: 'put',
  path: '/post/:id',
  handler: (req, res) => {
    const postUpdates = req.body.post;
    const id = req.params.id;
    const originalPost = data.posts[id];

    if (!originalPost) {
      return res.status(404).send({
        message: 'That post does not exit.'
      });
    }

    const updatedPost = {
      ...originalPost,
      ...postUpdates,
    };

    data.posts[updatedPost.id] = updatedPost;

    res.status(200).send({
      posts: {
        [updatedPost.id]: updatedPost
      },
    });
  },
};
