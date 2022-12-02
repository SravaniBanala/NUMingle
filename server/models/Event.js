const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Can't be blank"]
  },
  description: {
    type: String,
    required: [true, "Can't be blank"]
  },
  latlng: {
    type: Object,
    //required: [true, "Can't be blank"]
  },
  registeredUsers: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    //required: [true, "Can't be blank"]
  },
  time: {
    type: String,
    //required: [true, "Can't be blank"]
  }

}, {minimize: false});


const Event = mongoose.model('Event', EventSchema);

module.exports = Event