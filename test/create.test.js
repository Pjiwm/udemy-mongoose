const assert = require('assert')
const user = require('../src/user')

describe('Creating records', () => {
    it('saves a user', async () => {
        const joe = new user({ name: 'Joe Mamma' })
        await joe.save()
        assert(!joe.isNew)
    })
})