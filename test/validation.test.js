const assert = require('assert')
const user = require('../src/user')

describe('Validating records', () => {

    
    it('requires a user name',  () => {
        const newUser = new user({ name: undefined })
        const validationResult = newUser.validateSync()
        const { message } = validationResult.errors.name
        assert(message === 'Name is required.')
    })

    it('requires a user\'s name of at least 3 characters', () => {
        const newUser = new user({ name: 'Al' });
        const validationResult = newUser.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be at least 3 characters.')
    })

    it('disallows invalid records from being saved', async () => {
        const newUser = new user({ name: 'Al' });
        await newUser.save().catch((validationResult) => {
            const { message } = validationResult.errors.name;
            assert(message === 'Name must be at least 3 characters.')
        })

    })
})