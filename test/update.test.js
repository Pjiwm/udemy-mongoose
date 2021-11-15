const assert = require('assert')
const user = require('../src/user')
const mongoose = require('mongoose')

describe('Updating recors', () => {
    let joe

    beforeEach(async () => {
        await mongoose.connection.collections.users.drop()
        joe = new user({ name: 'Joe', postCount: 0 })
        await joe.save()
    })
    async function assertName() {
        const alexes = await user.find({ name: 'Alex' })
        assert(alexes.length === 1)
        assert(alexes[0].name != 'Joe')
        assert(alexes[0].name === 'Alex')
    }

    it('instance set and save', async () => {
        joe.set('name', 'Alex')
        await joe.save()
        await assertName()
    })

    it('model isntance can update', async () => {
        // old stuff LOL
        // await joe.update({ name: 'Alex' })
        await joe.updateOne({ name: 'Alex' })
        await assertName()
    })

    it('A model class can update', async () => {
        // old stuff LOL
        // await joe.update({ name: 'Joe' }, {name: 'Alex'})
        await user.updateMany({ name: 'Joe' }, { name: 'Alex' })
        await assertName()
    })

    it('A model class can update one record', async () => {
        await user.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' })
        await assertName()
    })

    it('A model class can find a record with an Id and update', async () => {
        await user.findByIdAndUpdate(joe._id, { name: 'Alex' })
        await assertName()
    })

    xit('A user can have their postCount incremented by 1', async () => {
        await user.updateMany({ name: 'Joe' }, { $inc: { postCount: 10 } })
        const foundUser = await user.findOne({ name: 'Joe'})
        assert(foundUser.postCount === 10)
    })
})


