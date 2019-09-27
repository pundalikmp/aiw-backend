const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName: {
        type: String,
        required: 'Required'
    },
    lastName: {
        type: String,
        required: 'Required'
    },
    mobile: {
        type: String,
        required: 'Required'
    },
    email: {
        type: String,
    },
});

const Address = mongoose.Schema({
    street: {
        type: String,
        // required: 'Required'
    },
    state: {
        type: String,
        // required: 'Required'
    },
    city: {
        type: String,
        // required: 'Required'
    },
    zip: {
        type: String,
        // required: 'Required'
    },
    country: {
        type: String,
    },
});

const OrderData = mongoose.Schema({
    username: {
        type: String,
        required: 'Required'
    },
    user: {
        type: User
    },
    address: {
        type: String,
        required: 'Required'
    },
    vehicle: {
        type: String,
        required: 'Required'
    },
    price: {
        type: Number,
        required: 'Required'
    },
    date :{
        type: Date,
        required: 'Required'
    },
    desc:  {
        type: String,
    }
});

module.exports = mongoose.model('Order', OrderData);