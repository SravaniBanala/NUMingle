const express = require('express');
const app = express();

// import routes
const eventsRoutes = require('./routes/eventsRoutes')

const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// routes

app.use('/events', eventsRoutes)

const server = require('http').createServer(app);
const PORT = 5001;


server.listen(PORT, ()=> {
  console.log('listening to port', PORT)
})
