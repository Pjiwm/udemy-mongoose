const mongoose = require('mongoose')
const assert = require('assert')
const user = require('../src/user')
const blogPost = require('../src/blog.post')

describe('Middleware', () => {
    let joe, newBlogPost

    beforeEach(async () => {
        const { users, blogposts } = mongoose.connection.collections
        await users.drop()
        await blogposts.drop()

        joe = new user({ name: 'Joe' })
        newBlogPost = new blogPost({ title: 'JS is Great', content: 'Yep it really is' })

        joe.blogPosts.push(newBlogPost)

        await joe.save()
        await newBlogPost.save()
    })

    it('users clean up blogposts on delete', async () => {
        await joe.delete()
        const count = await blogPost.count()
        console.log(count)
        assert(count === 0)
    })
})