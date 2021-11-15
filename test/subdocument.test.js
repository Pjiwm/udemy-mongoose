const assert = require('assert')
const user = require('../src/user')
const mongoose = require('mongoose')

describe('Subdocuments', () => {
    beforeEach(async () => {
        await mongoose.connection.collections.users.drop()
    })

    it('can create a Subdocuments', async () => {
        const joe = new user({
            name: 'Joe',
            posts: [{ title: 'PostTitle' }]
        })
        await joe.save()
        const foundUser = await user.findOne({ name: 'Joe' })
        assert(foundUser.posts[0].title === 'PostTitles')
    })
})