const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before(() => {
    mongoose.connect('mongodb://mongo:27017/users_test')
    mongoose.connection
        .once('open', () => { console.log('Connected to MongoDB') })
        .on('error', (error) => { console.warn('Warning', error) })
})

// commented out beforeach for droppin users collection.
// Some tests don't actually insert a new user to the database, 
// so if we drop it while there's no collection yet we get an error.

// beforeEach(async () => {
//    await mongoose.connection.collections.users.drop()
// })