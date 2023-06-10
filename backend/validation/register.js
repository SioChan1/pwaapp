const joi = require("joi")

const registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).max(255).required(),
        nickname: joi.string().min(5).max(255).required(),
        password: joi.string().min(8).max(255).required()
    })

    return schema.validate(data)
}

module.exports = { registerValidation }