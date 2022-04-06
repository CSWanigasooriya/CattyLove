const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    uid: { type: String, required: true },
    comment: { type: String },
    commentId: { type: mongoose.ObjectId, required: true }
}, {
    timestamps: true,
});


const Cat = new mongoose.Schema({
    cid: { type: String, required: true, unique: true },
    displayName: { type: String },
    gender: { type: String, },
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
    likedBy: { type: Array, default: [], unique: true, required: false },
    comments: { type: Array, ref: 'Comment', unique: false, required: false }
}, {
    timestamps: true,
    collection: 'cats'
})

const model = mongoose.model('Cat', Cat);

module.exports = model;