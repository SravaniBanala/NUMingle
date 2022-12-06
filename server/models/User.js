const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Can't be blank"]
  },
  nuid: {
    type: Number,
    //required: [true, "Can't be blank"]
    default: 12345
  },
  type: {
    type: String,
    //required: [true, "Can't be blank"]
  },
  
  connectionRequests: {
    type: Array,
    default: []
  },
  registeredEvents: {
    type: Array,
    default: []
  },
  discover: {
    type: Array,
    default: []
  },
  pollChoice: {
    type: Object,
    default: {}
  }
}, {minimize: false});

UserSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);

      user.password = hash
      next();
    })

  })

})




const User = mongoose.model('User', UserSchema);

module.exports = User
