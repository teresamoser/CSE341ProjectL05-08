const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/planets', require('./planets'));

module.exports = router;