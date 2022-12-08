const User = require('../models/User');
const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
    const allEvents = await Event.find();
    res.json(allEvents)

}

const registerEvent = async (req, res) => {
    const {event, user} = req.body

    const eventRegistered = await Event.findById(event._id);
    const userToRegister = await User.findById(user._id);

    // check for already registered
    if(userToRegister.registeredEvents.includes(eventRegistered._id)) {
        res.json({err: "Already registered for this event"})
        return
    }

    // register event
    eventRegistered.registeredUsers.push(userToRegister._id)
    userToRegister.registeredEvents.push(eventRegistered._id)
    
    await eventRegistered.save()
    await userToRegister.save()

    // add notifications in connections discover tab
    const connections = userToRegister.connections

    await Promise.all(
        connections.map(async (con) =>  {
            const user = await User.findById(con._id);
            user.discover.unshift({
                type: "event",
                eventid: eventRegistered._id,
                registeredBy: userToRegister._id
            })
            await user.save()
        })
    )

    res.json({success: "Registered for event successfully"})
}


const addEvent = async (req, res) => {
    try {
        const {title, description, latlng, date, time} = req.body;
        console.log("In addEvent", req.body);
        const event = await Event.create({title, description, latlng, date, time});
        res.status(201).json({sucess: "Event Added Successfully"});
      } catch (e) {
        let msg = "Error Occured"
        console.log(e);
        res.status(400).json(msg)
      }
}

module.exports = {getAllEvents, registerEvent, addEvent} 

