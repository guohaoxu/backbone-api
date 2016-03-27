var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/backbone-api',
    errorHandler = require('errorHandler'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    routes = require('./app/routes/index'),
    settings = require('./settings'),
    app = express();

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')

app.use(methodOverride())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: settings.cookieSecret,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    resave: false,
    saveUninitialized: true
}))
app.use(compression())
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

if ('development' === app.get('env')) {
    app.use(logger('dev'))
    app.use(errorHandler())
}

//Pages routes
//app.get('/', routes.index)

// REST API routes
//app.all('/api', routes.authorize)
app.get('/api/articles', routes.articleList)

app.all('*', function (req, res) {
    res.sendfile(path.join(__dirname + '/public/index.html'))
})

app.listen(app.get('port'), function () {
    console.log('Server is running on ' + app.set('port'))
})
