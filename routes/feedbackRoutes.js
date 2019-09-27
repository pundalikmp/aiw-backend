const express = require('express');
const router = express.Router();
const Feedback = require('../model/feedbackModel');

router.post('/', (req, res) => {
    let feedback;
    if (req.body) {
        const feed = req.body;
        console.log(feed);
        
        feedback = new Feedback({
            username: feed.username,
            vehicle: feed.vehicle,
            vehicleFeedback: feed.vehicleFeedback,
            driverFeedback: feed.driverFeedback,
            appFeedback: feed.appFeedback,
            desc: feed.desc
        });
    }
    if (feedback) {
        feedback.save((err, data) => {
            if (!err) {
        console.log({data});
        res.status(200).json({
                    status: 'OK',
                })
            } else {
                res.status(405).json({
                    status: 'NOK',
                })
            }
        }, (error) => {
            res.status(404).json({
                message: 'Something wnet wrong',
                error: error
            })
        });
    }
})

module.exports = router;
