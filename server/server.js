const express = require('express');
const app = express();

// import routes
const userRoutes = require('./routes/userRoutes')
const connectRoutes = require('./routes/connectRoutes')
const eventsRoutes = require('./routes/eventsRoutes')
const discoverRoutes = require('./routes/discoverRoutes')
const pollsRoutes = require('./routes/pollsRoutes')


const User = require('./models/User');
const Message = require('./models/Message')
const rooms = ['Software Engineering Lobby', 'Data Science Lobby', 'Industrial Engineering Lobby', 'Biotechnology Lobby'];
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// routes
app.use('/users', userRoutes)
app.use('/connect', connectRoutes)
app.use('/events', eventsRoutes)
app.use('/discover', discoverRoutes)
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
