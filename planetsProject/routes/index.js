const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/planets', require('./planets'));
router.use('/spacecraft', require('./spacecraft'));

module.exports = router;