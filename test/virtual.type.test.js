const assert = require('assert')
const user = require('../src/user')
const mongoose = require('mongoose')

describe('Virtual types', () => {

    beforeEach(async () => {
        await mongoose.connection.collections.users.drop()
    })

    it('postCount returns number of posts', async () => {
        let joe = new user({
            name: 'Joe',
            posts: [{ title: "PostTitle" }]
        })
        await joe.save()
        // retrieve from db..
        joe = await user.findOne({ name: 'Joe' })
        assert(joe.postCount === 1);
    })
})