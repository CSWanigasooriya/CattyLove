const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    collection: 'users'
})


const model = mongoose.model('User', User);

module.exports = model;