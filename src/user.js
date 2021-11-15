const mongoose = require('mongoose')
const schema = mongoose.Schema
const postSchema = require('./post')

const userSchema = new schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length >= 3,
            message: 'Name must be at least 3 characters.'
        },
        required: [true, 'Name is required.'],
    },
    posts: [postSchema],
    likes: Number,
    blogPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
})

userSchema.virtual('postCount').get(function() {
    return this.posts.length
})

const user = mongoose.model('user', userSchema)
module.exports = user