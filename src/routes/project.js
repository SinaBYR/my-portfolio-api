const express = require('express')
const multer = require('multer')
const router = new express.Router()
const Project = require('../models/project')
const cors = require('cors')

router.use(cors())

const upload = multer({
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('File must be an image.'))
        }

        cb(null, true)
    }
})

router.post('/projects', upload.single('preview'), async (req, res) => {
    const document = {
        ...req.body,
        preview: req.file.buffer
    }
    const project = new Project(document)
    try {
        await project.save()
        res.status(201).send(document)
    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
})

module.exports = router