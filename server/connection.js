const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.s11qz.mongodb.net/chatAppMern?retryWrites=true&w=majority`, ()=> {
//   console.log('connected to mongodb')
// })

mongoose.connect(`mongodb://localhost:27017/nu_mingle`, ()=> {
  console.log('connected to mongodb')
})
//mongodb+srv://Numingle:Numingle@123@cluster0.7jlpucw.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect(`mongodb+srv://Numingle:Numingle@123@cluster0.7jlpucw.mongodb.net/?retryWrites=true&w=majority`, ()=> {
//   console.log('connected to mongodb')
// })
