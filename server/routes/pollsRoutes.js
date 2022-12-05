const router = require('express').Router();

const {getAllPolls, storeChoice, incrementChoiceCount, getUserPollsChoices, addPoll } = require('../controllers/pollsController')


router.get('/getAllPolls', getAllPolls)
router.post('/getUserPollsChoices', getUserPollsChoices)
router.post('/storeChoice', storeChoice)
router.post('/incrementChoiceCount', incrementChoiceCount)
router.post('/addPoll', addPoll)
//router.post('/registerEvent', getAllPolls)


module.exports = router