const joi = require("joi")
const jwt = require("jsonwebtoken")

const verifyUserAndToken = (req, res, next) => {
    const token = req.header("auth-token")

    if(!token){
        return res.status(401).json({ error: "Access denied" })
    }

    try {
        const verified = jwt.verify(token, "pineappleJuice") /* <- dis not to safe... */
        req.user = verified

        const pageId = req.params.id
        const localId = jwt.decode(token).id
        if(pageId != localId){
            res.status(401).json({ error: "You stupid dont try to hack, qus dat bad"})
        }

        next()
    } catch (error) {
        res.status(400).json({ error: "Invalid token"})
    }
}

module.exports = { verifyUserAndToken }