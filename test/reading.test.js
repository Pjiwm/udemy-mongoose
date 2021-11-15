const assert = require('assert')
const user = require('../src/user')
const mongoose = require('mongoose')

describe('Reading require', async () => {
    let joe
    beforeEach(async () => {
        await mongoose.connection.collections.users.drop()
        joe = new user({name: 'Joe'})
        await joe.save()
    })

    it('should return a user object with the name Joe', async () => {
        const foundUsers = await user.find({name: 'Joe'})
            assert(foundUsers[0]._id.toString() === joe._id.toString())
    })

    it('find a user with particular id', async () => {
         const foundUser = await user.findOne({_id: joe._id})
            assert(foundUser.name === 'Joe')
    })
})