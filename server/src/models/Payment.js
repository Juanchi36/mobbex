const mongoose = require('mongoose');
const { Schema } = mongoose;

const Payment = new Schema({
  type: String,
  data: Object,
  timeStamp : {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', Payment);
