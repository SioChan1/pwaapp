const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
   /*  username: {type: String, require: true, min: 3},
    password: {type: String, require: true, min: 3},
    nickname: {
        type: String, 
        require: true, 
        min: 3
    } */
    nickname: {
        type: String, 
        require: true, 
        min: 3,
        max: 255
    },
    username: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 255
    }
})

module.exports = mongoose.model('User', UsersSchema)