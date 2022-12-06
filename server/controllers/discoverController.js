const User = require('../models/User');
const Event = require('../models/Event');

const getDiscoverList = async (req, res) => {
    const userInp = req.body
    const user = await User.findById(userInp._id);
    const discoverListRaw = user.discover
    const result = []
    await Promise.all(
        discoverListRaw.map(async (dis) =>  {
            let resultObj = {}
            if (dis.type == "connection"){
                resultObj.type = "connection"
                const user1 = await User.findById(dis.connectedBy);
                const user2 = await User.findById(dis.connectedTo);
                resultObj.connectedBy = user1
                resultObj.connectedTo = user2
            }
            if (dis.type == "event"){
                resultObj.type = "event"
                const event = await Event.findById(dis.eventid);
                const user = await User.findById(dis.registeredBy);
                resultObj.event = event
                resultObj.registeredBy = user
            }
            result.push(resultObj)
        })
    )

    res.json(result)

}

const registerEvent = async (req, res) => {
      const {event, user} = req.body

     const eventRegistered = await Event.findById(event._id);
    const userToRegister = await User.findById(user._id);

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
             user.discover.push({
                 type: "event",
                 eventid: eventRegistered._id,
                 registeredBy: userToRegister._id
             })
             await user.save()
         })
     )

     res.json({success: "User registered for event"})
 }

module.exports = {getDiscoverList} 

