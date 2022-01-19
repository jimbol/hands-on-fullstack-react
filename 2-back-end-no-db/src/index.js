import express from 'express';
import * as routes from './routes';

const app = express();
const port = 5000;

app.use(express.json());

Object.values(routes).forEach((route) => {
  console.log(route);
  app[route.method](route.path, route.handler);
});

app.get('/test', (req, res) => res.status(200).send({ tested: true }));

app.listen(port);
console.log(`Express started on port ${port}`);
