const express = require('express')
const projectsRouter = require('./routes/project')

const app = express()
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(projectsRouter)


app.listen(port, () => {
    console.log('Server up and running on port ' + port)
})