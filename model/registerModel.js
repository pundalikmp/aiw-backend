const mongoose = require('mongoose');

const registerData = mongoose.Schema({
    username: {
        type: String,
        required: 'Required',
        unique: true
    },
    pass: {
        type: String,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: Number
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('Register', registerData);