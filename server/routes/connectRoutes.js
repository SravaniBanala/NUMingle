const router = require('express').Router();
const User = require('../models/User');
const {getAllUsers, createConnectionReq, getAllConnectionRequests, getAllConnections, createConnection, removeConnection, rejectConnection} = require('../controllers/connectController')


router.get('/getAllUsers', getAllUsers)
router.post('/createConnectionReq', createConnectionReq)
router.post('/getAllConnectionRequests', getAllConnectionRequests)
router.post('/getAllConnections', getAllConnections)
router.post('/createConnection', createConnection)
router.post('/removeConnection', removeConnection)
router.post('/rejectConnection', rejectConnection)

module.exports = router