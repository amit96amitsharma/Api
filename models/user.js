const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone: String,
    name: String,
    email: {
        type: String,
        lowercase: true
    }
})

module.exports = mongoose.model('users', userSchema)
