const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');
const auth0Controller = require('../controllers/auth0');
const homeController = require('../controllers/index');

const swagger = require('./swagger');
const planets = require('./planets');
const spacecraft = require('./spacecraft');
//const users = require('./users');
const auth0 = require('./auth0');

router.use(auth(auth0Controller.config));
router.use('/auth0', auth0);
router.use('/api-docs', swagger);
router.use('/planets', planets);
router.use('/spacecraft', spacecraft);
// router.use('/users', users);
router.use('/', homeController.home);

module.exports = router;
