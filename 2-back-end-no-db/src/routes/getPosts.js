import { data } from '../db/data';

export const getPosts = {
  method: 'get',
  path: '/posts',
  handler: (req, res) => {
    res.status(200);
    res.send(data);
  },
};
