const mongoose = require('mongoose');

const User = new mongoose.Schema({
    uid: { type: String },
    displayName: { type: String },
    photoUrl: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'users'
})


const model = mongoose.model('User', User);

module.exports = model;