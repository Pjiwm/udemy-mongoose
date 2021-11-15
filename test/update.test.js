const assert = require('assert')
const user = require('../src/user')

describe('Updating recors', () => {
    let joe
    beforeEach(async () => {
        joe = new user({ name: 'Joe' })
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
        // await joe.update({ name: 'Alex' }, {name: 'Joe'})
        await user.updateMany({ name: 'Joe'}, { name: 'Alex' })
        await assertName()
    })

    it('A model class can update one record', async () => {
        await user.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex' })
        await assertName()
    })

    it('A model class can find a record with an Id and update', async () => {
        await user.findByIdAndUpdate(joe._id, { name: 'Alex' })
        await assertName()
        
    })
})


