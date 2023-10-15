const express = require('express');
const router = express.Router();

const planetsController = require('../controllers/planets');

router.get('/', planetsController.getAll);

router.get('/:id', planetsController.getSingle);

router.post('/', planetsController.createPlanets);

router.put('/:id', planetsController.updatePlanets);

router.delete('/:id', planetsController.deletePlanets);

module.exports = router;