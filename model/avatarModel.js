const mongoose = require('mongoose');

const avatarData = mongoose.Schema({
    avatar: {
        type: String,
        require: 'Required'
    },
    username: {
        type: String,
        required: 'Required'
    }
})


module.exports = mongoose.model('Avatar', avatarData);