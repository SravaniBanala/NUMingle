const Event = require('../models/Event');
const User = require('../models/User');

const getAllEvents = async (req, res) => {
    const allEvents = await Event.find();
    res.json(allEvents)

}

const addEvent = async (req, res) => {
    try {
        const {title, description, latlng, date, time} = req.body;
        console.log("In addEvent", req.body);
        const event = await Event.create({title, description, latlng, date, time});
        res.status(201).json({sucess: "Event Added Successfully"});
      } catch (e) {
        let msg = "Error Occured"

      }
}
module.exports = {getAllEvents, addEvent} 
