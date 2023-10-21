const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('spacecraft').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('spacecraft').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createSpacecraft = async (req, res) => {
  const planets = {
    objective: req.body.objective,
    spacecraft: req.body.spacecraft,
    spacecraftMass: req.body.spacecraftMass,
    missionDesign: req.body.missionDesign,
    launchDateTime: req.body.launchDateTime,
    launchSite: req.body.launchSite,
    scientificInstruments: req.body.scientificInstruments
  };
  const response = await mongodb.getDb().db().collection('spacecraft').insertOne(spacecraft);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the spacecraft.');
  }
};

const updateSpacecraft = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  //be aware of updateOne if you only want to update specific fields
  const spacecraft = {
    objective: req.body.objective,
    spacecraft: req.body.spacecraft,
    spacecraftMass: req.body.spacecraftMass,
    missionDesign: req.body.missionDesign,
    launchDateTime: req.body.launchDateTime,
    launchSite: req.body.launchSite,
    scientificInstruments: req.body.scientificInstruments
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('spacecraft')
    .replaceOne({ _id: userId }, spacecraft);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the spacecraft.');
  }
};

const deleteSpacecraft = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('spacecraft').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the spacecraft.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createSpacecraft,
  updateSpacecraft,
  deleteSpacecraft
};