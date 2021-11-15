const assert = require('assert')
const user = require('../src/user')
const mongoose = require('mongoose')

describe('Subdocuments', () => {
    beforeEach(async () => {
        await mongoose.connection.collections.users.drop()
    })

    it('Can create a Subdocument', async () => {
        const joe = new user({
            name: 'Joe',
            posts: [{ title: 'PostTitle' }]
        })
        await joe.save()
        const foundUser = await user.findOne({ name: 'Joe' })
        assert(foundUser.posts[0].title === 'PostTitle')
    })

    it('Can add subdocuments to an existing record', async () => {
        const joe = new user({
            name: 'Joe',
            posts: []
        })
        await joe.save()
        let newUser = await user.findOne({ name: 'Joe' })
        newUser.posts.push({ title: 'New Post' })
        await newUser.save()
        // we retrieve the data from the database, so we're sure that the post was pushed to DB.
        newUser = await user.findOne({ name: 'Joe' })
        assert(newUser.posts[0].title === 'New Post')
    })

    it('can remove an existing subdocument', async () => {
        let joe = new user({
            name: 'Joe',
            posts: [{ title: 'New title' }]
        })
        await joe.save()
        // we retrieve user from db again (similar to last test)
        joe = await user.findOne({ name: 'Joe' })
        const post = joe.posts[0]
        post.remove()
        await joe.save()
        // we retrieve again...
        joe = await user.findOne({ name: 'Joe' })
        assert(joe.posts.length === 1)
    })
})