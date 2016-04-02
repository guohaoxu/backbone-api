var settings = require('../../settings'),
    mongoose = require('mongoose')
mongoose.connect(settings.dbUrl)
var Keywords = new mongoose.Schema({
    keyword: String
})
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: String
})
var BookModel = mongoose.model('Book', Book)

module.exports = function (app) {
    //Pages routes
    //app.get('/', function (req, res) {
        //
    //})

    // RESTful API routes
    app.get('/book/api', function (req, res) {
        res.send('Library API is running.')
    })

    app.get('/book/api/books', function (req, res) {
        BookModel.find(function (err, books) {
            if (err) {
                return console.log(err)
            }
            res.send(books)
        })
    })
    app.post('/book/api/books', function (req, res) {
        var book = new BookModel({
            title: req.body.title,
            author: req.body.author,
            releaseDate: req.body.releaseDate,
            keywords: req.body.keywords
        })
        book.save(function (err) {
            if (err) {
                return console.log(err)
            }
            res.send(book)
        })
    })
    app.get('/book/api/books/:id', function (req, res) {
        BookModel.findById(req.params.id, function (err, book) {
            if (err) {
                return console.log(err)
            }
            res.send(book)
        })
    })
    app.put('/book/api/books/:id', function (req, res) {
        BookModel.findById(req.params.id, function (err, book) {
            book.title = req.body.title
            book.author = req.body.author
            book.releaseDate = req.body.releaseDate
            book.keywords = req.body.keywords
            book.save(function (err) {
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
}