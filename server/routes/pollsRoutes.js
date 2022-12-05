const router = require('express').Router();

const {getAllPolls, storeChoice, incrementChoiceCount, getUserPollsChoices, addPoll } = require('../controllers/pollsController')


router.get('/getAllPolls', getAllPolls)
router.post('/addPoll', addPoll)
//router.post('/registerEvent', getAllPolls)


module.exports = router