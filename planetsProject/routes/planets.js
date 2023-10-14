const express = require('express');
const router = express.Router();

const planetsController = require('../controllers/planets');

router.get('/', planetsController.getAll);

router.get('/:id', planetsController.getSingle);

//router.post('/', planetsController.createContact);

//router.put('/:id', planetsController.updateContact);

//router.delete('/:id', planetsController.deleteContact);

module.exports = router;