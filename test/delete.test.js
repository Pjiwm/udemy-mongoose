const assert = require('assert')
const user = require('../src/user')
const mongoose = require('mongoose')

describe('deleting a user', () => {
    let joe

    beforeEach(async () => {
        await mongoose.connection.collections.users.drop()
        joe = new user({ name: 'Joe' })
        await joe.save()
    })

    async function assertUserNull() {
        const foundUser = await user.findOne({ name: 'Joe' })
        assert(foundUser === null)
    }

    it('model instance remove', async () => {
        await joe.remove()
        await assertUserNull()
    })

    it('class method remove', async () => {
        // old stuff LOL
        // await user.remove({ name: 'Joe' })
        await user.deleteMany({ name: 'Joe' })
        await assertUserNull()
    })

    it('class method findAndRemove', async () => {
        await user.findOneAndRemove({ name: 'Joe' })
        await assertUserNull()
    })

    it('class method findByIdAndRemove', async () => {
        await user.findByIdAndRemove(joe._id)
        await assertUserNull()

    })    
})