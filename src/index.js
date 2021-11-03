const express = require('express')
const projectsRouter = require('./routes/project')
const cors = require('cors')
require('dotenv').config({ path: './config/.env' })

// for running mongoose server
require('./db/mongoose')

const app = express()
const port = process.env.PORT;

app.use(express.json())
// app.use(projectsRouter)
app.use(cors())

app.listen(port, () => {
    console.log('Server up and running on port ' + port)
})