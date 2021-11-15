const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length >= 3,
            message: 'Name must be at least 3 characters.'
        },
        required: [true, 'Name is required.'],
    },
    postCount: Number,
})
const user = mongoose.model('user', userSchema)
module.exports = user