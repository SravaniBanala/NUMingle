const router = require('express').Router();

const {getAllEvents, registerEvent, addEvent } = require('../controllers/eventsController')


router.get('/getAllEvents', getAllEvents)


module.exports = router