module.exports = (mongoose) => {
    const Spacecraft = mongoose.models(
      'spacecraft',
      mongoose.Schema({
        objective: {
          type: String
        },
        spacecraft: {
          type: String
        },
        spacecraftMass: {
          type: Number
        },
        missionDesign: {
          type: String
        },
        launchDateTime: {
          type: String
        },
        launchSite: {
           type: String
        },
        scientificInstruments: {
           type: String
        }
      })
    );
  
    return Spacecraft;
  };