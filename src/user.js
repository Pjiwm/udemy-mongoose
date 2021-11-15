const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    postCount: Number,
})
const user = mongoose.model('user', userSchema)
module.exports = user