const mongoose = require('mongoose')
const user = require('../src/user')
const comment = require('../src/comment')
const blogPost = require('../src/blog.post')
const assert = require('assert')

describe('Associations', () => {

    let joe, newBlogPost, newComment
    beforeEach(async () => {
        const { users, blogposts, comments } = mongoose.connection.collections
        await users.drop(),comments.drop(), blogposts.drop()

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

    it('saves a full relation tree', async () => {
        const newUser = await user.findOne({ name: 'Joe' }).populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })

        assert(newUser.name == 'Joe')
        assert(newUser.blogPosts[0].title == 'JS is Great')
        assert(newUser.blogPosts[0].comments[0].content == 'Congrats on great post')
        assert(newUser.blogPosts[0].comments[0].user.name == 'Joe')
    })
})