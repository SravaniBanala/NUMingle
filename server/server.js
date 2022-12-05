const express = require('express');
const app = express();

// import routes
const eventsRoutes = require('./routes/eventsRoutes')
const pollsRoutes = require('./routes/pollsRoutes')

const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// routes

app.use('/events', eventsRoutes)
app.use('/polls', pollsRoutes)

require('./connection')

const server = require('http').createServer(app);
const PORT = 5001;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

server.listen(PORT, ()=> {
  console.log('listening to port', PORT)
})
