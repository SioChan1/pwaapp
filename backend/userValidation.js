const joi = require("joi")
const jwt = require("jsonwebtoken")
const Todos = require("./models/Todos")

const verifyUserAndToken = (req, res, next) => {
    const token = req.header("auth-token")

    if(!token){
        return res.status(401).json({ error: "Access denied" })
    }

    try {
        Todos.find({ 
            _id: req.params.id,
            creator: jwt.decode(token).name
        })
        .then(data => {
            if(data.length > 0){
                try {
                    const verified = jwt.verify(token, "pineappleJuice")
                    req.user = verified
                    next()
                } catch (error) {
                    res.status(400).json({ error: "Invalid token"})
                }
            }else{
                res.send("You do not belong here!")
            }
        })
    } catch (error) {
        res.status(400).json({ error: "Invalid token"})
    }
}

module.exports = { verifyUserAndToken }