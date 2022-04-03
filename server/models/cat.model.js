const mongoose = require('mongoose');


const Cat = new mongoose.Schema({
    cid: { type: String, required: true },
    displayName: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    photoURL: { type: String, required: true },
    likedBy: { type: Array, "default": [] },
    comments: { type: Array, "default": [] }
}, {
    timestamps: true,
    collection: 'cats'
})

const model = mongoose.model('Cat', Cat);

module.exports = model;