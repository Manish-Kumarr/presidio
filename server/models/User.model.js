const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require,
    },
    lastname: {
      type: String,
      require,
    },
    email: {
      type: String,
      require,
    },
    password: {
      type: String,
      require,
    },
    phone: {
      type: String,
      require,
    },
    isSeller: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
