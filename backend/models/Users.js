const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    nickname: {type: String, require: true}
})

module.exports = mongoose.model('User', UsersSchema)