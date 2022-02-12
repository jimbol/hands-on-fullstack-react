import * as Post from '../db/postModel';

export const createPost = {
  method: 'post',
  path: '/post',
  handler: async (req, res) => {
    console.log('req');
    console.log(req);
    console.log('req.apiGateway');
    console.log(req.apiGateway);
    console.log('req.apiGateway.event');
    console.log(req.apiGateway.event);
    console.log('req.apiGateway.event.requestContext');
    console.log(req.apiGateway.event.requestContext);
    console.log('req.apiGateway.event.requestContext.authorizer');
    console.log(req.apiGateway.event.requestContext.authorizer);
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
