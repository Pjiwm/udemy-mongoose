const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before(() => {
    mongoose.connect('mongodb://mongo:27017/users_test')
    mongoose.connection
        .once('open', () => { console.log('Connected to MongoDB') })
        .on('error', (error) => { console.warn('Warning', error) })
})


beforeEach(async () => {
   await mongoose.connection.collections.users.drop()
})