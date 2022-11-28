const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes')
const rooms = ['Software Engineering Lobby', 'Data Science Lobby', 'Industrial Engineering Lobby', 'Biotechnology Lobby'];
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes)
require('./connection')


server.listen(PORT, ()=> {
  console.log('listening to port', PORT)
})
