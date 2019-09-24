const express = require('express');
const router = express.Router();
const Avatar = require('../model/avatarModel');
const fs = require('fs-extra')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) =>  {
        callback(null, file.originalname);
    }
});

const fileFiletr = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false)
    }
}

const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFiletr
    });


router.post('/', upload.single('avatar'), (req, res) => {
    let data;
    let newImg = fs.readFileSync(req.file.path);
    // encode the file as a base64 string.
    let encode_image = newImg.toString('base64');
    
    if (req.file && req.body) {
        data = new Avatar({
            avatar: encode_image,
            username: req.body.username
        });
    }
        if (data) {
            data.save((err, result) => {
                if (err) {
                    res.send(err);
                } else if (result) {
                    res.status(200).json({
                        avatar: data.avatar,
                        status: 'OK'
                    })
                } else {
                    res.status(200).json({
                        message: 'Something went wrong',
                        status: 'NOK'
                    })
                }
            }, (error) => {
                res.send(error);
            })
        }
});

router.get('/', (req, res) => {

    if (req.query.username) {
        Avatar.find({username: req.query.username}, (err, result) => {
            res.setHeader('content-type', 'image/jpg');
            res.send({
                data: result
            })
        }, error => {
            console.log({error});
        })
    }
})

module.exports = router;
