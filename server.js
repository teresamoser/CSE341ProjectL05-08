const express = require('express');
const app = express();
const mongodb = require('./planetsProject/db/connect');
const bodyParser = require('body-parser');

const port = process.env.PORT;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    // Allows access from any website
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