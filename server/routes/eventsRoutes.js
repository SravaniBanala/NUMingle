const router = require('express').Router();

const {getAllEvents, registerEvent, addEvent } = require('../controllers/eventsController')


router.get('/getAllEvents', getAllEvents)
router.post('/registerEvent', registerEvent)
router.post('/addEvent', addEvent)


module.exports = router