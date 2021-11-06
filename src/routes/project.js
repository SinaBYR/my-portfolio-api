const express = require('express')
const multer = require('multer')
const router = new express.Router()
const Project = require('../models/project')
const cors = require('cors')
const sharp = require('sharp')

router.use(cors())

const upload = multer({
    fileFilter(req, file, cb) {
        if(!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('File must be an image.'))
        }

        cb(null, true)
    }
})

// POST /projects
router.post('/projects', upload.single('preview'), async (req, res) => {
    const buffer = await sharp(req.file?.buffer).webp().toBuffer()
    const document = {
        ...req.body,
        preview: buffer
    }
    const project = new Project(document)
    try {
        await project.save()
        res.status(201).send(project)

    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
})

// GET /projects?titleOnly=true : returns only titles of projects
router.get('/projects', async (req, res) => {
    const selectOptions = {}

    if(req.query.titleOnly) {
        selectOptions.title = 1
    }

    try {
        const projects = await Project.find({}).select(selectOptions)
        res.send(projects)
    } catch(err) {
        res.status(500).send()
    }
})

router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(!project) {
            return res.status(404).send()
        }

        res.send(project)
    } catch(err) {
        res.status(500).send()
    }
})

router.get('/projects/preview/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(!project) {
            return res.status(404).send()
        }

        res.set('Content-Type', 'image/png')
        res.send(project.preview)
    } catch(err) {
        res.status(500).send()
    }
})

router.patch('/projects/:id', upload.single('preview'), async (req, res) => {
    const allowedUpdates = ['title', 'description', 'demo', 'code', 'tech']
    const updates = Object.keys(req.body)
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update))

    if(!isUpdateValid) {
        return res.status(400).send({error: 'Invalid updates'})
    }

    try {
        const project = await Project.findById(req.params.id)
        if(!project) {
            return res.status(404).send()
        }
        
        updates.forEach(update => {
            project[update] = req.body[update]
        })
        // update preview if only preview file was updated
        if(req.file) {
            const buffer = await sharp(req.file.buffer).png().toBuffer()
            project.preview = buffer
        }
        
        await project.save()
        res.send(project)
    } catch(err) {
        res.status(500).send()
    }
})

router.delete('/projects/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const project = await Project.findByIdAndDelete({_id})
        if(!project) {
            return res.status(404).send()
        }
        
        res.send(project)
    } catch(err) {
        res.status(500).send()
    }
})

module.exports = router