const express = require('express')
const multer = require('multer')
const router = new express.Router()
const Project = require('../models/project')

router.get('/projects', (req, res) => {

})

const upload = multer({
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('File must be an image.'))
        }

        cb(null, true)
    }
})

router.post('/projects', upload.single('preview'), (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    // try {
    //     const project = new Project(req.body)
    // } catch(err) {

    // }
    res.send({
        body: req.body,
        file: req.file.buffer
    })
})

module.exports = router