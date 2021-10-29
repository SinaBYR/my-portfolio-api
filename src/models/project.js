const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
    },
    demo: {
        type: String,
        required: true,
        trim: true,
    },
    tech: [{
        type: String,
        required: true
    }],
    preview: {
        type: Buffer,
        required: true
    }
})

projectSchema.methods.toJSON = function() {
    const project = this
    const projectPlainObject = project.toObject()

    delete projectPlainObject.preview
    delete projectPlainObject.__v

    return projectPlainObject
}

const Project = mongoose.model('Project', projectSchema)

module.exports = Project