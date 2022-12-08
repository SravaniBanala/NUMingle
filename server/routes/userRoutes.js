const router = require('express').Router();
const User = require('../models/User');
const {getAllUsers} = require('../controllers/connectController')


// signup creating user
router.post('/', async(req, res)=> {
  try {
    const {name, nuid, email, password, picture, type} = req.body;
    console.log(req.body);
    const user = await User.create({name, nuid, email, password, picture, type});
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "User already exists"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
})

router.post('/update', async(req, res)=> {
  try {
    const {user, name, email} = req.body;
    console.log("update inp", req.body);
    const userdb = await User.findById(user._id);

    userdb.name = name
    userdb.email = email

    const updated = await userdb.save()
    console.log("update ->", updated);
    res.status(201).json(updated);
  } catch (e) {
    let msg;
    if(e.code == 11000){
      msg = "Error Occured"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg)
  }
})

// login user

router.post('/login', async(req, res)=> {
  try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (e) {
      res.status(400).json(e.message)
  }
})



module.exports = router
