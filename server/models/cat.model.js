const mongoose = require('mongoose');


const Cat = new mongoose.Schema({
    cid: { type: String, required: true },
    displayName: { type: String },
    gender: { type: String, required: true },
    description: { type: String },
    photoURL: { type: String },
    location: {
        type: {
            address: String,
            city: String,
            lat: Number,
            lng: Number
        }
    },
    likedBy: [{
        type: {
            uid: String,
        }
    }],
    comments: [{
        type: Object
    }]
}, {
    timestamps: true,
    collection: 'cats'
})

const model = mongoose.model('Cat', Cat);

module.exports = model;