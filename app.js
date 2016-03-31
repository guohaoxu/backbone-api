var express = require('express'),
    path = require('path'),
    util = require('util'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    errorHandler = require('errorHandler'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    settings = require('./settings'),
    mongoose = require('mongoose'),
    url = 'mongodb://localhost:27017/backbone-book',
    app = express()

mongoose.connect(url)
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
})
var BookModel = mongoose.model('Book', Book)

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
app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

if ('development' === app.get('env')) {
    app.use(logger('dev'))
    app.use(errorHandler())
}

//Pages routes
//app.get('/', routes.index)

// RESTful API routes
//app.all('/api', routes.authorize)

//app.get('/todo', function (req, res) {
//    res.sendfile(path.join(__dirname + '/public/todo/index.html'))
//    console.log('td..');
//})

app.get('/book/api', function (req, res) {
    res.send('Library API is running.')
})

app.get('/book/api/books', function (req, res) {
    return BookModel.find(function (err, books) {
        if (err) {
            return console.log(err)
        }
        return res.send(books)
    })
})
app.post('/book/api/books', function (req, res) {
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        //releaseDate: req.body.releaseDate
        releaseDate: new Date()
    })
    return book.save(function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('created!')
        res.send(book)
    })
})
app.get('/book/api/books/:id', function (req, res) {
    return BookModel.findById(req.params.id, function (err, book) {
        if (err) {
            return console.log(err)
        }
        res.send(book)
    })
})
app.put('/book/api/books/:id', function (req, res) {
    return BookModel.findById(req.params.id, function (err, book) {
        book.title = req.body.title
        book.author = req.body.author
        book.releaseDate = req.body.releaseDate
        return book.save(function (err) {
            if (err) {
                return console.log(err)
            }
            res.send(book)
        })
    })
})
app.delete('/book/api/books/:id', function (req, res) {
    BookModel.findById(req.params.id, function (err, book) {
        book.remove(function (err) {
            if (err) {
                return console.log('Book removed!')
            }
            res.send('')
        })
    })
})


app.all('*', function (req, res) {
    res.end('404')
})

app.listen(app.get('port'), function () {
    console.log('Server is running on ' + app.set('port'))
})
