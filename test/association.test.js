const mongoose = require('mongoose')
const user = require('../src/user')
const comment = require('../src/comment')
const blogPost = require('../src/blog.post')
const assert = require('assert')

describe('Associations', () => {
    
    let joe, newBlogPost, newComment
    beforeEach(async () => {
        const { users, blogposts, comments } = mongoose.connection.collections
        await users.drop()
        await comments.drop()
        await blogposts.drop()

        joe = new user({ name: 'Joe' })
        newBlogPost = new blogPost({ title: 'JS is Great', content: 'Yep it really is' })
        newComment = new comment({ content: 'Congrats on great post' })

        joe.blogPosts.push(newBlogPost)
        newBlogPost.comments.push(newComment)
        newComment.user = joe

        await joe.save()
        await newComment.save()
        await newBlogPost.save()
    })

    it('saves a relation between a user and a blog post', async () => {
        const newUser = await user.findOne({ name: 'Joe' }).populate('blogPosts')
        assert(newUser.blogPosts[0].title === 'JS is Great')
    })
})