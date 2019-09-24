const express = require('express');
const router = express.Router();
const ProfileAuth = require('../model/loginModel');
const Register = require('../model/registerModel');

router.get('/', (req, res) => {
    ProfileAuth.find((err, data) => {
        res.status(201).json({
            message: 'Profile found',
            data: data
        })
    })
});

router.post('/auth',  (req, res) => {
    console.log('ok');
    
     Register.find({username: req.body.username}, (err, user) => {
        if (err) {
    return;
        } else if (user.length > 0) {
    user.map(value => {
                if (value.username == req.body.username && value.pass == req.body.pass) {
                    res.status(201).json({
                        status: 'OK'
                    })
                } else {
    res.status(401).json({
                        message: 'Username and Password does not match',
                    })
                }
            });
        } else {
    res.status(505).json({
        message: 'Username not present, please signup.!'
            })
        }
    }, (error) => {
        res.status(505).json({
            message: 'Something went wrong'
                })
    })
});

router.delete('/', (req, res) => {
    ProfileAuth.deleteOne({ _id: req.body.id }, (error, data) => {
        if (!error) {
            res.status(200).json({
                message: 'Item deleted',
                item: req.body.id,
            })
        }
    });
});

module.exports = router;