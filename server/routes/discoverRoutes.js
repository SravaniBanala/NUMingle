const router = require('express').Router();

const {getDiscoverList } = require('../controllers/discoverController')


router.post('/getDiscoverList', getDiscoverList)

// router.post('/createConnectionReq', createConnectionReq)
// router.post('/getAllConnectionRequests', getAllConnectionRequests)
// router.post('/getAllConnections', getAllConnections)
// router.post('/createConnection', createConnection)
// router.post('/removeConnection', removeConnection)
// router.post('/rejectConnection', rejectConnection)

module.exports = router