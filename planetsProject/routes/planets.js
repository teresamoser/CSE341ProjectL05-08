const express = require('express');
const router = express.Router();

const planetsController = require('../controllers/planets');
//const validation = require('../middleware/validate');

router.get('/', planetsController.getAllPlanets); 
router.get('/:id', planetsController.getSinglePlanet);

router.post('/',
    //validation.saveplanets,
    planetsController.createPlanets);

router.put('/:id', 
    //validation.saveplanets,
    planetsController.updatePlanets);

router.delete('/:id', planetsController.deletePlanets);

module.exports = router;
