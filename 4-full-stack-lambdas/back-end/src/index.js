import express from 'express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as routes from './routes';
import * as db from './db/connect';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // switch when pointing towards netlify
  // origin: process.env.client || 'http://localhost:3000',
}));


Object.values(routes).forEach((route) => {
  console.log(route);

  app[route.method](`/api${route.path}`, (...args) => {

    const connectDB = async () => {
      await db.connect();
      return route.handler(...args);
    };

    return connectDB();
  });
});

app.get('/api/test', (req, res) => {
  console.log('/api/test was called');
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Express started on port ${port}`);
});

export { app };


