const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo:27017/users_test')
mongoose.connection
.once('open', () => { console.log('Connected to MongoDB')})
.on('error', (error) => { console.warn('Warning', error)})