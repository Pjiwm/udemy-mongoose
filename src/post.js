const mongoose = require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema({
    title: String
})

module.exports = postSchema