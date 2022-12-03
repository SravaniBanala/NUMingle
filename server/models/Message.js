const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message
