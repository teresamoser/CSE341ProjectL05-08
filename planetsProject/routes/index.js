const express = require('express');
const router = express.Router();
const app = express();

router.use('/', require('./swagger'));
router.use('/planets', require('./planets'));
router.use('/spacecraft', require('./spacecraft'));

module.exports = router;

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-ub36gl36y4obcwli.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"Kg04PeSvvRxbnWDQ3dBQfng6PMAkdWAD","client_secret":"yc4UYyNwuvNc7Y9uNQGItPNZbRaAv5nlWXEWusq317dhYhpdb48q3B5yuasyAJuj","audience":"https://dev-ub36gl36y4obcwli.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://dev-ub36gl36y4obcwli.us.auth0.com/api/v2/',
  headers: {authorization: 'Bearer TOKEN'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
