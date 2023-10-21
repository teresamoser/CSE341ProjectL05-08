const express = require('express');
const router = express.Router();

const spacecraftController = require('../controllers/spacecraft');

router.get('/', spacecraftController.getAll);

router.get('/:id', spacecraftController.getSingle);

router.post('/', spacecraftController.createSpacecraft);

router.put('/:id', spacecraftController.updateSpacecraft);

router.delete('/:id', spacecraftController.deleteSpacecraft);

module.exports = router;