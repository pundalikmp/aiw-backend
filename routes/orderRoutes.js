const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Order = require('../model/orderModel');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS
    }
});

router.get('/', (req, res) => {
    Order.find({username: req.query.username}, (err, result) => {
        if (err) {
            res.status(404).json({
                message: 'Something went wrong, try after sometime',
                error: err
            })
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.status(404).json({
                    message: 'No data found',
                })
            }
        }
    }, (error) => {
        res.send({
            message: 'Something went wrong, try after sometime',
            error: error
        })
    })
}, (error) => {
    res.send(error);
    console.log(error);
});

router.post('/book', (req, res) => {
    let orderData;
    if (req.body) {
        const data = req.body;
        orderData = new Order({
            username: data.username,
            user: {
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                mobile: data.user.mobile,
                email: data.user.email
            },
            address: data.address,
            vehicle: data.vehicle,
            price: data.price,
            desc: data.desc,
            date: data.date
        });

        console.log(orderData);


        if (orderData) {

            orderData.save().then(response => {
                if (response) {
                    var mailOptions = {
                        from: process.env.MY_EMAIL,
                        to: orderData.user.email,
                        subject: `Order confirmation order id - ${Math.floor(Math.random() * 100) + 1}`,
                        html: `<div style="padding: 20px">
                                    <h4> Hi ${orderData.user.firstName} ${orderData.user.lastName},</h4>
                                <div>
                                Thanks for using AIW earth movers. We are arranging a vehicle for you. Vehicle will be there at mentioned address on time.
                                </div>
                                <div style="margin-top: 10px">
                                Please reply back to <a href="mailto:aiwearthmovers@gmail.com?Subject=Hello%20Pundalik" target="_top"> aiwearthmovers@gmail.com </a> mail if any query.
                                </div>
                                <div style="margin-top: 20px"><b>Best Regards,</b><div>
                                <div><b>AIW</b></div>
                                </div>
                                `
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log({ error });
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    res.status(201).json({
                        status: 'OK',
                    })
                } else {
                    res.status(401).json({
                        errmsg: 'Something went wrong'
                    })
                }
            }, (error) => {
                res.status(401).json({
                    errmsg: 'Something went wrong',
                    error: error
                })
            })
        }
    }
})

module.exports = router;