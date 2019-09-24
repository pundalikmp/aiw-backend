const mongoose = require('mongoose');

const LoginData = mongoose.Schema({
    username: {
        type: String,
        required: 'Required'
    },
    pass: {
        type: String,
    }
});

module.exports =  mongoose.model('ProfileAuth', LoginData);