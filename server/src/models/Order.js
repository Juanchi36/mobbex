const mongoose = require('mongoose');
const { Schema } = mongoose;

const Order = new Schema({
  state: String,
  date: Date,
  products: Array,
});

module.exports = mongoose.model('Order', Order);
