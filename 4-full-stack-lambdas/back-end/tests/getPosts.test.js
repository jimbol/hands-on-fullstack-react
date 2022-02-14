import 'core-js/stable';
import 'regenerator-runtime/runtime';
import AWS from 'aws-sdk';
import { getPost } from '../src/routes/getPost';


test('getPost returns a post for an ID', async () => {
  const postId = 1;
  const post = {
    id: postId,
    title: 'Test post',
    body: 'Test post body',
  };

  const req = {
    params: {
      id: postId,
    },
  };
  const res = {
    status: jest.fn(),
    send: jest.fn(),
  };

  AWS.DynamoDB.DocumentClient = jest.fn().mockReturnValue({
    get: (params) => ({
      promise: jest.fn().mockResolvedValue({
        Item: params.Key.id === postId ? post : null,
      }),
    }),
  });

  await getPost.handler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledWith({ posts: [post]});
});
