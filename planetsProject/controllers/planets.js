const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('test2.planets').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('planets').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPlanets = async (req, res) => {
  const planets = {
    name: req.body.name,
    numberOrder: req.body.numberOrder,
    distanceFromSun: req.body.distanceFromSun,
    temperature: req.body.temperature,
    dayLength: req.body.dayLength,
    yearLength: req.body.yearLength,
    numberOfMoons: req.body.numberOfMoons
  };
  const response = await mongodb.getDb().db().collection('planets').insertOne(planets);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the planet.');
  }
};

const updatePlanets = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  //be aware of updateOne if you only want to update specific fields
  const planets = {
    name: req.body.name,
    numberOrder: req.body.numberOrder,
    distanceFromSun: req.body.distanceFromSun,
    temperature: req.body.temperature,
    dayLength: req.body.dayLength,
    yearLength: req.body.yearLength,
    numberOfMoons: req.body.numberOfMoons
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('planets')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the planet.');
  }
};

const deletePlanets = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('planets').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the planet.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlanets,
  updatePlanets,
  deletePlanets
};