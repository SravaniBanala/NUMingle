const User = require('../models/User');
const Event = require('../models/Event');
const Poll = require('../models/Poll');


const getAllPolls = async (req, res) => {
    const allPolls = await Poll.find();
    //console.log("allPolls ---", allPolls)
    res.json(allPolls)
}


const addPoll = async (req, res) => {
    try {
        const {title, description, options} = req.body;
        console.log("In addPoll", req.body);
        const poll = await Poll.create({title, description, options});
        res.status(201).json({sucess: "Poll Added Successfully"});
      } catch (e) {
        let msg = "Error Occured"
        console.log(e);
        res.status(400).json(msg)
      }
}

module.exports = {getAllPolls, addPoll} 

