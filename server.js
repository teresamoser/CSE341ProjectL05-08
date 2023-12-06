const express = require('express');
const app = express();
const mongodb = require('./planetsProject/db/connect');
const bodyParser = require('body-parser');

const port = process.env.PORT;

const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const checkScopes = requiredScopes('read:messages');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://dev-5bq8e5nmcxqqmalf.us.auth0.com/api/v2/',
  issuerBaseURL: 'http://localhost:8080'
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// This route doesn't need authentication
app.get('/api/public', function (req, res) {
  res.json({
    message: 'Hello from a public endpoint! You do not need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, checkScopes, function (_req, res) {
  res.json({
    message:
      'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app
  .use(bodyParser.json())
  .use((_req, res, next) => {
    // Allows access from any website
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./planetsProject/routes'));
