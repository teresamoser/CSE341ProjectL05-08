const validator = require('../helpers/validate');
const ObjectId = require('mongodb').ObjectId;

const checkId = (req, res, next) => {
  // checks to see if the id entered is a valid Mongodb ID
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must use a valid ID.' });
    process.exit;
  } else {
    next();
  }
};

const savePlanets = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    numberOrder: 'required|numeric',
    distanceFromSun: 'required|string',
    temperature: 'required|string',
    dayLength: 'required|string',
    yearLength: 'required|string',
    numberOfMoons: 'required|numeric'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveSpacecraft = (req, res, next) => {
  const validationRule = {
    objective: 'required|string',
    spacecraft: 'required|string',
    spacecraftMass: 'required|string',
    missionDesign: 'required|string',
    launchDateTime: 'required|string',
    launchSite: 'required|string',
    scientificInstruments: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

module.exports = {
  checkId,
  savePlanets,
  saveSpacecraft
};
