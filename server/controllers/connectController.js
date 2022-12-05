const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers)

}

const createConnectionReq = async (req, res) => {
    const {sender, receiver} = req.body
    const user = await User.findById(sender._id);
    const requested = await User.findById(receiver._id);

    if (requested.connectionRequests.includes(user._id)) {
        res.json({err: "Connection request already exists"})
        return
    }
    if (requested.connections.includes(user._id)) {
        res.json({err: "You are already Connected"})
        return
    }
    requested.connectionRequests.push(user._id)
    await requested.save()
    //console.log(user)
    res.json({success: "Connection request successfully sent"})
}

const createConnection = async (req, res) => {
    const {sender, receiver} = req.body
    const user1 = await User.findById(sender._id);
    const user2 = await User.findById(receiver._id);
    if (user1.connections.includes(user2._id)) {
        res.json({err: "Already Connected"})
        return
    }

    user1.connections.push(user2._id)
    user2.connections.push(user1._id)

    //remove from connection requests
    user1.connectionRequests.remove(user2._id)

    // add notifications in connections discover tab
    await Promise.all(
        user1.connections.map(async (con) =>  {
            const user = await User.findById(con._id);
            if(!user.connections.includes(JSON.stringify(user2._id)) && JSON.stringify(user._id) != JSON.stringify(user2._id)){
                user.discover.unshift({
                    type: "connection",
                    connectedBy: user1._id,
                    connectedTo: user2._id
                })
            }
            await user.save()
        })
    )
    await Promise.all(
        user2.connections.map(async (con) =>  {
            const user = await User.findById(con._id);
            if(!user.connections.includes(JSON.stringify(user1._id)) && JSON.stringify(user._id) != JSON.stringify(user1._id)){
                user.discover.unshift({
                    type: "connection",
                    connectedBy: user2._id,
                    connectedTo: user1._id
                })
            }
            await user.save()
        })
    )

    await user1.save()
    await user2.save()

    res.json({success: "Connection created successfully"})

}
const removeConnection = async (req, res) => {
    const {sender, receiver} = req.body
    const user1 = await User.findById(sender._id);
    const user2 = await User.findById(receiver._id);

    user1.connections.remove(user2._id)
    user2.connections.remove(user1._id)
    await user1.save()
    await user2.save()
    res.json({success: "Connection removed successfully"})

}
const rejectConnection = async (req, res) => {
    const {sender, receiver} = req.body
    const user1 = await User.findById(sender._id);
    const user2 = await User.findById(receiver._id);

    user1.connectionRequests.remove(user2._id)
    await user1.save()

    res.json({success: "Connection request rejected"})

}
const getAllConnectionRequests = async (req, res) => {
    const sender = req.body
    const user = await User.findById(sender._id);
    //const allUsers = await User.find();
    const result = []

    await Promise.all(
        user.connectionRequests.map(async (id) => {
            const found = await User.findById(id);
            result.push(found)
        })
    )
    res.json(result)

}
const getAllConnections = async (req, res) => {
    const sender = req.body
    const user = await User.findById(sender._id);
    const result = []

    await Promise.all(
        user.connections.map(async (id) => {
            const found = await User.findById(id);
            result.push(found)
        })
    )
    res.json(result)

}

module.exports = {getAllUsers, createConnectionReq, getAllConnectionRequests, getAllConnections, createConnection, removeConnection, rejectConnection} 