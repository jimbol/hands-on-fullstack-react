import { data } from '../db/data';
import { v4 as uuid } from 'uuid';

export const createPost = {
  method: 'post',
  path: '/post',
  handler: (req, res) => {
    const newPost = req.body.post;
    newPost.id = uuid();

    data.posts[newPost.id] = newPost;

    res.status(200);
    res.send({
      posts: {
        [newPost.id]: newPost
      },
    });
  },
};
