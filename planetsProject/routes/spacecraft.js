const express = require('express');
const router = express.Router();

const spacecraftController = require('../controllers/spacecraft');
//const validation = require('../middleware/validate'); 

router.get('/', spacecraftController.getAllSpacecraft);

router.get('/:id', spacecraftController.getSingleSpacecraft);

router.post('/', 
    //validation.savespacecraft,
    spacecraftController.createSpacecraft);

router.put('/:id', 
    //validation.savespacecraft,
    spacecraftController.updateSpacecraft);

router.delete('/:id', spacecraftController.deleteSpacecraft);

module.exports = router;