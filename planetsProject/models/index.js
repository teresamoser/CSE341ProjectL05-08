const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.planets = require('./planet.js')(mongoose);
db.spacecraft = require('./spacecraft.js')(mongoose);

module.exports = db;