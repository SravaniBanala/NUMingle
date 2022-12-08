const router = require('express').Router();

const {getCalenderEvents } = require('../controllers/calenderController')


router.post('/getCalenderEvents', getCalenderEvents)


module.exports = router