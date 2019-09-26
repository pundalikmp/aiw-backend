const express = require('express');
const router = express.Router();
const Register = require('../model/registerModel');
const Avatar = require('../model/avatarModel');

router.post('/', (req, res) => {
    let registerData;

    if (req.body != undefined) {
        const data = req.body;
        registerData = new Register({
            username: data.username,
            pass: data.pass,
            firstName: data.firstName ? data.firstName : '',
            lastName: data.lastName ? data.lastName : '',
            email: data.email ? data.email : '',
            mobile: req.body.mobile ? req.body.mobile : null,
            address: req.body.address ? req.body.address : '',
        })
    }
    if (registerData != undefined) {
        if (!req.body.mobile) {
            Register.find({ username: registerData.username }, (onError, onSuccess) => {
                if (onError) {
                    res.send(onError);
                } else {
                    if (onSuccess.length > 0) {
                        res.send({
                            message: 'username already present'
                        })
                    } else {
                        registerData.save((err) => {
                            if (!err) {
                                res.status(201).json({
                                    status: 'OK'
                                })
                            } else {
                                res.status(505).json({
                                    status: 'NOK',
                                    error: err
                                })
                            }
                        });
                    }
                }
            })

        } else {
            Register.updateOne({ username: req.body.username }, {
                $set: {
                    mobile: req.body.mobile ? req.body.mobile : null,
                    address: req.body.address ? req.body.address : '',
                }
            }, (err, raw) => {
                if (err) {
                    return err;
                } else {
                    res.status(201).json({
                        status: 'OK',
                        data: raw
                    })
                }
            }, error => {
                res.send(error);
            })
        }
    } else {
        res.status(505).json({
            status: 'NOK',
            error: err
        })
    }
});

router.get('/', (req, res) => {

    const username = req.query.username;
    let aPath;
    if (username) {
        Register.find({ username: username }, (err, response) => {
            if (err) {
                res.status(404).json({
                    error: err
                });
            } else if (response.length > 0) {
                Avatar.find({ username: username }, (e, data) => {

                    if (e) {
                        res.status(404).json({
                            error: e
                        });
                    } else if (data.length > 0) {
                        aPath = data[0].avatar
                    }
                })
                res.status(201).json({
                    profile: response,
                    path: aPath
                });
            }
        }, (error) => {
            res.status(505).json({
                errorMessage: 'Username not present',
                errro: error
            });
        });
    } else {
        res.send({ message: 'Please login' });
    }

});

module.exports = router;