// Importing Dependencies:
const mongodb = require('../db/connect');// is a reference to my database connection
const ObjectId = require('mongodb').ObjectId;// is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.


// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
};

// Function that handles a GET request.
const getAllSpacecraft = async (req, res) => {
  try{
    // add the database
    const result = await mongodb
      .getDb()
      .db()
      .collection('spacecraft')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error){
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Gets a single Spacecraft
const getSingleSpacecraft = async (req, res) => {
  try{
    // add the database
    const spacecraftId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('spacecraft')
      .find({ _id: spacecraftId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};


// Create a POST const
const createSpacecraft = async (req, res) => {
  try{
    // Check if user is authenticated (To be used with OAuth)
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule an appointment.');
    // }
    // add the database
    const spacecraft = req.body;
    const response = await mongodb
      .getDb()
      .db()
      .collection('spacecraft')
      .insertOne(spacecraft);

    if (response.acknowledged) {
      const newSpacecraftId = response.insertedId;
        res
        .status(201)
        .json({ message: 'Spacecraft created successfully', SpacecraftId: newSpacecraftId });
      } else {
        errorResponse(res, 500, 'Failed to create Spacecraft');
      }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a PUT request to update a spacecraft.
const updateSpacecraft = async (req, res) => {
  try {
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule a appointment.');
    // }
    const spacecraftId = new ObjectId(req.params.id);
    const updatedSpacecraft = req.body;
    // add the database
    const response = await mongodb
      .getDb()
      .db()
      .collection('spacecraft')
      .updateOne({ _id: spacecraftId }, { $set: { spacecraft: updatedSpacecraft } });

    if (response.matchedCount === 1 && response.modifiedCount === 1) {
      res.status(204).json({ message: 'Spacecraft updated successfully' });
      } else {
        errorResponse(res, 404, 'Spacecraft not found or not updated');
      }
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a DELETE request.
const deleteSpacecraft = async (req, res) => {
  try{
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to delete an appointment.');
    // }
    // add the database
    const spacecraftId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('spacecraft')
      .deleteOne({ _id: spacecraftId });

    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Spacecraft deleted successfully' });
      } else {
        errorResponse(res, 404, 'Spacecraft not found');
      }
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAllSpacecraft,
  getSingleSpacecraft,
  createSpacecraft,
  updateSpacecraft,
  deleteSpacecraft
};
