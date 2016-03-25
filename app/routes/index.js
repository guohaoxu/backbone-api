var path = require('path')
exports.authorize = function (req, res) {

}
exports.index = function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index2.html'))
}
exports.login = function (req, res) {
    res.send('login!')
}
exports.articleList = function (req, res) {

}