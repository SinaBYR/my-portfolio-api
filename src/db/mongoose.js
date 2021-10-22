const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/my-portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})