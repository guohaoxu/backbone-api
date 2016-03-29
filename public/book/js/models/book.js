/*global Backbone, $ */
var app = app || {};
(function () {
    'use strict';
    app.Book = Backbone.Model.extend({
        defaults: {
            coverImage: '/book/img/coverImage.jpg',
            title: 'No title',
            author: 'Unknown',
            releaseDate: 'Unknown',
            keywords: 'None'
        }
    })
}());