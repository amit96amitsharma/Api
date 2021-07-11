const experss = require('express')
const morgan = require('morgan')
const userRoutes = require('../settings/routes')
const testRoutes = require('../settings/routes-test')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = experss()


// mongoose.connect('mongodb://@mongod.m-sas.com:27017/ams,{ user: admin, pass: admin}', {

// mongoose.connect('mongodb://admin:admin@mongod.m-sas.com:27017/ams', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }).then(() => {
//     console.log('Database Connected.......')
// }).catch((error) => {
//     console.error(error);
// })

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Assess-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE')
        return res.status(200).json({})
    }
    next();
})

// Routers which should handle requests
app.use('/users', userRoutes);
app.use('/test', testRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;