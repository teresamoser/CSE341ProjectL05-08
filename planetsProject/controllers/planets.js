// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId;  // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
};

// Function that handles a GET request.
const getAllPlanets = async (req, res) => {
  try{
    // add the database
    const result = await mongodb.getDb().db().collection('planets').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error){
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error'); 
  }
};

// Gets a single Spacecraft
const getSinglePlanet = async (req, res) => {
  try{
    //add the database
    const planetId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('planets')
      .find({ _id: spacecraftId })
      .toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, 'Internal Server Error');
  }
};

// Create a POST const
const createPlanets = async (req, res) => {
  try{
    // Check if user is authenticated (To be used with OAuth)
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule an appointment.');
    // }

    // add the database
    const planets = req.body;
    const response = await mongodb
      .getDb()
      .db()
      .collection('planets')
      .insertOne(planets);

    if (response.acknowledged) {
      const newPlanetId = response.insertedId;
      res
      .status(201)
      .json({ message: 'Planet created successfully', PlanetId: newPlanetId });
      } else {
        errorResponse(res, 500, 'Failed to create Spacecraft');
      }
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, 'Internal Server Error');
  } 
};

// Function that handles a PUT request to update a spacecraft.
const updatePlanets = async (req, res) => {
  try{
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule a appointment.');
    // }
    const planetId = new ObjectId(req.params.id);
    const updatedPlanet = req.body;

    // add database
    const response = await mongodb
      .getDb()
      .db()
      .collection('planets')
      .updateOne({ _id: planetId }, { $set: { planet: updatedPlanet } });
   
      if (response.matchedCount === 1 && response.modifiedCount === 1) {
        res.status(204).json({ message: 'Planet updated successfully' });
        } else {
          errorResponse(res, 404, 'Planeet not found or not updated');
        }
      } catch (error) {
        console.error(error);
        errorResponse(res, 500, 'Internal Server Error');
    }
};


// Function that handles a DELETE request.
const deletePlanets = async (req, res) => {
  try{
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to delete an appointment.');
    // }

    // add the database
    const planetId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('planets')
      .deleteOne({ _id: planetId });

    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Planet deleted successfully' });
      } else {
        errorResponse(res, 404, 'Planet not found');
      }
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAllPlanets,
  getSinglePlanet,
  createPlanets,
  updatePlanets,
  deletePlanets
};