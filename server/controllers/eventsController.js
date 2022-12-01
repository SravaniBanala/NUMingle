const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
    const allEvents = await Event.find();
    res.json(allEvents)

}

module.exports = {getAllEvents} 

