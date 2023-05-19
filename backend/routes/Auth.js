const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

// create new user
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        password: hashedPassword
    }); 
    const savedUser = await newUser.save() // mongo save method
    res.json(savedUser) // respond with json to our post endpoint
});

router.get('/login', async (req, res) => {
    res.send("Meep moop")
})

router.post('/login', async (req, res) => {
    console.log(req.body.username)

    const userData = await User.findOne({ username: req.body.username })
    console.log(userData)
    if(!userData){
        return res.status(400).json({ error: "Wrong username or password" })
    }
    console.log("Me here?")

    // Correct password?
    const validPassword = await bcrypt.compare(req.body.password, userData.password)
    if(!validPassword){
        return res.status(400).json({ error: "Wrong username or password" })
    }


    // Create token
    const token = jwt.sign({
        id: userData.id,
        name: userData.name
    },
    "pineappleJuice",
    { expiresIn: "24h" }
    )

    // Attach token to header
    res.header("auth-token", token).json({
        error: null,
        data: { 
            token,
            "id": userData._id
        }
    })
})

module.exports = router 