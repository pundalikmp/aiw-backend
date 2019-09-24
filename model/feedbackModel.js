const mongoose = require('mongoose');

const feedbackData = mongoose.Schema({
    username: {
        type: String,
        required: "Required"
    },
    vehicle: {
        type: String,
        required: "Required"
    },
    vehicleFeedback: {
        type: String,
        required: "Required"
    },
    driverFeedback: {
        type: String,
    },
    appFeedback: {
        type: String,
        required: "Required"
    },
    desc: {
        type: String,
    }
})

module.exports = mongoose.model('Feedback', feedbackData);
