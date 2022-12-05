
const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Can't be blank"]
  },
  description: {
    type: String,
    //required: [true, "Can't be blank"]
  },
  options: {
    type: Array,
    //required: [true, "Can't be blank"]
  }

}, {minimize: false});


const Poll = mongoose.model('Polls', PollSchema);

module.exports = Poll