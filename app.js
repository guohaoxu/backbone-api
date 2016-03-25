var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/backbone-api',
    errorHandler = require('errorHandler'),
    logger = require('morgan'),
    app = express();

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(compression())

app.use(logger('dev'))
app.use(express.static('./public'))







app.get('/', function (req, res) {
    res.sendFile('/index.html')
})

if (process.env.NODE_ENV === 'development') {
//    app.use(errorHandler())
    app.use(errorHandler({
        log: errorNotification
    }))
}
function errorNotification(err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url
    notifier.notify({
        title: title,
        message: str
    })
}


app.listen(3000, function () {
    console.log('Server is running!')
})
