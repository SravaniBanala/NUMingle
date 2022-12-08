const User = require('../models/User');
const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
    const allEvents = await Event.find();
    res.json(allEvents)

}

const getCalenderEvents = async (req, res) => {
    const userInp = req.body
    const user = await User.findById(userInp._id);
    const eventsRaw = user.registeredEvents
    //console.log("eventsRaw -->", eventsRaw)
    let result = []
    await Promise.all(
        eventsRaw.map(async (eventId) =>  {
            let eventStr = eventId + ""
            console.log("eventsRaw -->", eventStr)
            // const middle = eventStr.slice(
            //     eventStr.indexOf('"'),
            //     eventStr.lastIndexOf('"'),
            //   );
            //console.log("middle -->", middle)
            const event = await Event.findById(eventStr);
            result.push(event)
        })
    )
    console.log("getCalenderEvents -->", result)
    res.json(result)

}



module.exports = {getCalenderEvents} 

