import express from 'express';
import * as routes from './routes';
import * as db from './db/connect';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(express.json());

app.use(cors({
  origin: process.env.client || 'http://localhost:3000',
}));

const setUpRoutes = async () => {
  await db.connect();

  Object.values(routes).forEach((route) => {
    console.log(route);
    app[route.method](`/api${route.path}`, route.handler);
  });
}

setUpRoutes();

app.get('/api/test', (req, res) => {
  console.log('/api/test was called');
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Express started on port ${port}`);
});

export { app };


