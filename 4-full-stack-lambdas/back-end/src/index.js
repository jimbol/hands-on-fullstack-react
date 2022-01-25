import express from 'express';
import * as routes from './routes';
import * as db from './db/connect';
import cors from 'cors';

// const DB_URL = 'mongodb://ec2-user@ec2-18-216-169-124.us-east-2.compute.amazonaws.com:27017';
const DB_URL = 'mongodb://blog:VCNXRA7dhgzekFmKuYmcoQwD!@3.17.147.6/blog';
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors({
  origin: process.env.client || 'http://localhost:3000',
}));


Object.values(routes).forEach((route) => {
  console.log(route);
  app[route.method](`/api${route.path}`, (...args) => {

    const connectDB = async () => {
      await db.connect(DB_URL);
      return route.handler(...args);
    };

    return connectDB();
  });
});

app.get('/api/test', (req, res) => {
  console.log('/api/test called');
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Express started on port ${port}`);
});

export { app };


