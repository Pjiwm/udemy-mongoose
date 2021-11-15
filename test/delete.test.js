const assert = require('assert')
const user = require('../src/user')

describe('deleting a user', () => {
    let joe

    beforeEach(async () => {
        joe = new user({ name: 'Joe' })
        await joe.save()
    })

    async function assertUserNull() {
        const foundUser = await user.findOne({ name: 'Joe' })
        assert(foundUser === null)
    }

    it('model instance remove', async () => {
        await joe.remove()
        assertUserNull()
    })

    it('class method remove', async () => {
        // old stuff LOL
        // await user.remove({ name: 'Joe' })
        await user.deleteMany({ name: 'Joe' })
        assertUserNull()
    })

    it('class method findAndRemove', async () => {
        await user.findOneAndRemove({ name: 'Joe' })
        assertUserNull()
    })

    it('class method findByIdAndRemove', async () => {
        await user.findByIdAndRemove(joe._id)
        assertUserNull()

    })

    
})