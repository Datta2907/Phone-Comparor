const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    usertype: {
        type: String,
        default: 'Admin'
    }
});

module.exports = mongoose.model('User', userschema);