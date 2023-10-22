const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./planetsProject/db/connect');

const port = process.env.PORT || 3000;
const app = express();
const db = require('./planetsProject/models');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./planetsProject/routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // .then(() => {
  //   app.listen(port, () => {
  //     console.log(`DB Connected and server running on ${port}.`);
  //   });
  // })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });