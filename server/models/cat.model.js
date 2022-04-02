const mongoose = require('mongoose');

const Cat = new mongoose.Schema({
    id: { type: String, required: true },
    displayName: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String, required: true },
    likes: { type: Number }
}, {
    collection: 'cats'
})

const model = mongoose.model('Cat', Cat);

module.exports = model;