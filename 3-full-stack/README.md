# Complete Full-Stack Project
This folder contains our complete full-stack blog application.

## Prepare app for deployment to EC2
### Update back-end to serve static files
`back-end/index.js`
```es6
import path from 'path';

// ...
const __dirname = path.resolve(path.dirname(''));
const staticPath = path.join(__dirname, '../front-end/build');

app.use(express.static(staticPath));

// ...
app.get('/*', function(req, res) {
  res.sendFile(`${staticPath}/index.html`);
});
```

### Update front-end to use relative base path.

`front-end/src/modules/api.js`
```es6
const basePath = '/api';
```

## Practice
This portion of the repository includes the Mongo database and stitches together the front-end, back-end, and database.

1. Start the database and run some test queries using the [MONGO_DB_QUICKSTART](MONGO_DB_QUICKSTART.md) guide.
2. [Update the back-end](../back-end/README.md) to connect to the database. Test using Postman.
3. [Update the front-end](../front-end/README.md) to connect to the API using Redux Thunks to make requests to the new back-end.
4. Once you have your code running locally. Follow the [RUN_ON_EC2.md](RUN_ON_EC2.md) guide to deploy to EC2.
