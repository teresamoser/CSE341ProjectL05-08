const express = require('express');
// const router = express.Router();
const app = express();

var router = require('express').Router();
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require ('dotenv');

router.use('/', require('./swagger'));
router.use('/planets', require('./planets'));
router.use('/spacecraft', require('./spacecraft'));

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;

const createError = require('http-errors');
//const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { signupValidation, loginValidation } = require('../middleware/validate.js');
const port = 8080; 
//const app = express();
 
app.use(express.json());
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());
 
app.get('/', (req, res) => {
    res.send('Node js file upload rest apis');
});
 
app.post('/register', signupValidation, (req, res, next) => {
   // your registration code
});
 
 
app.post('/login', loginValidation, (req, res, next) => {
   // your login code
});
 
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});
 
app.listen(port,() => console.log(`Server is running on port ${port}`));
