const User = require('../models/User');
const Event = require('../models/Event');
const Poll = require('../models/Poll');


const getAllPolls = async (req, res) => {
    const allPolls = await Poll.find();
    //console.log("allPolls ---", allPolls)
    res.json(allPolls)
}
const getUserPollsChoices = async (req, res) => {

    const userInp = req.body
    const user = await User.findById(userInp._id);
    const pollsCoices = user.pollChoice
    res.json(pollsCoices)
}

const storeChoice = async (req, res) => {
    const {user, value, poll} = req.body
    const curUser = await User.findById(user._id);
    const curPoll = await Poll.findById(poll._id);
    curUser.pollChoice[curPoll._id] = value
    await User.updateOne({_id: user._id},curUser)

    res.json(curUser.pollChoice)
}
const incrementChoiceCount = async (req, res) => {
    const {user, value, poll} = req.body
    const curPoll = await Poll.findById(poll._id);
    const curUser = await User.findById(user._id);
    curPoll.options.map((o) => {
        if(o[0] == value){
            o[1] += 1
        }
        if(o[0] == curUser.pollChoice[curPoll._id]){
            o[1] -= 1
        }
    })
    await Poll.updateOne({_id: poll._id},curPoll)    

    const newPoll = await Poll.find();
    res.json(newPoll)
}

const addPoll = async (req, res) => {
    try {
        const {title, description, options} = req.body;
        const poll = await Poll.create({title, description, options});
        res.status(201).json({sucess: "Poll Added Successfully"});
      } catch (e) {
        let msg = "Error Occured"
        console.log(e);
        res.status(400).json(msg)
      }
}

module.exports = {getAllPolls, storeChoice, incrementChoiceCount, getUserPollsChoices, addPoll} 

