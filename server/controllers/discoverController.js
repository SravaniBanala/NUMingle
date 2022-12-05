const User = require('../models/User');
const Event = require('../models/Event');



// const registerEvent = async (req, res) => {
//     const {event, user} = req.body

//     const eventRegistered = await Event.findById(event._id);
//     const userToRegister = await User.findById(user._id);

//     // register event
//     eventRegistered.registeredUsers.push(userToRegister._id)
//     userToRegister.registeredEvents.push(eventRegistered._id)
    
//     await eventRegistered.save()
//     await userToRegister.save()

//     // add notifications in connections discover tab
//     const connections = userToRegister.connections

//     await Promise.all(
//         connections.map(async (con) =>  {
//             const user = await User.findById(con._id);
//             user.discover.push({
//                 type: "event",
//                 eventid: eventRegistered._id,
//                 registeredBy: userToRegister._id
//             })
//             await user.save()
//         })
//     )

//     res.json({success: "User registered for event"})
// }

module.exports = {getDiscoverList} 

