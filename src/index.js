const express = require('express')

const app = express()

const port = process.env.PORT || 8000

app.get('/projects', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.send({data: 'Hello World'})
})

app.get('/resume', (req, res) => {

})

app.listen(port, () => {
    console.log('Server up and running on port ' + port)
})