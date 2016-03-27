var path = require('path')
exports.index = function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
}
exports.articleList = function (req, res) {
    res.json([
        { title: 'a', completed: true },
        { title: 'b', completed: false },
        { title: 'c', completed: true },
        { title: 'd', completed: true },
        { title: 'e', completed: false },
        { title: 'f', completed: true },
        { title: 'g', completed: false },
        { title: 'h', completed: false },
        { title: 'i', completed: true },
        { title: 'j', completed: false },
    ])
}