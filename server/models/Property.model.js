const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  place: {
    type: String,
    require,
  },
  area: {
    type: String,
    require,
  },
  nearby: {
    type: String,
  },
  noOfBedrooms: {
    type: Number,
    require,
  },
  price: {
    type: Number,
    require,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
});

module.exports = mongoose.model('Property', propertySchema);
