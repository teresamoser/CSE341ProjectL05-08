module.exports = (mongoose) => {
    const Planets = mongoose.model('planets', mongoose.Schema({
        name: {type: String},
        numberOrder: {type: Number},
        distanceFromSun: {type: String},
        temperature: {type: String},
        dayLength: {type: String},
        yearLength: {type: String},
        numberOfMoons: {type: Number}
      }));
    return Planets;
  };