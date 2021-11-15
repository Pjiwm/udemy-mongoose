const assert = require('assert')
const user = require('../src/user')
const mongoose = require('mongoose')

describe('Reading require', async () => {
    let joe, maria, alex, zach
    beforeEach(async () => {
        await mongoose.connection.collections.users.drop()
        joe = new user({ name: 'Joe' })
        maria = new user({ name: 'Maria' })
        alex = new user({ name: 'Alex' })
        zach = new user({ name: 'Zach' })

        await joe.save()
        await maria.save()
        await alex.save()
        await zach.save()
    })

    it('should return a user object with the name Joe', async () => {
        const foundUsers = await user.find({ name: 'Joe' })
        assert(foundUsers[0]._id.toString() === joe._id.toString())
    })

    it('find a user with particular id', async () => {
        const foundUser = await user.findOne({ _id: joe._id })
        assert(foundUser.name === 'Joe')
    })

    it('can skip and limit the result set', async () => {
        const users = await user.find({}).sort({name: 1}).skip(1).limit(2)
        assert(users.length === 2)
        assert(users[0].name === 'Joe')
        assert(users[1].name === 'Maria')
    })
})