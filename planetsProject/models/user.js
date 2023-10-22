module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      username: {
        type: String
      },
      password: {
        type: String
      },
      displayName: {
        type: String
      },
      email: {
        type: String
      },

      info: {
        email: {
          type: String
        },
        phoneNumber: {
          type: String
        },
      }
    });
  
    return mongoose.model('users', userSchema);
  };