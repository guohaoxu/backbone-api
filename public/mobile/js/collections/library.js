/*global Backbone, $ */
var app = app || {};
(function () {
    'use strict';
    app.Library = Backbone.Collection.extend({
        model: app.Book,
        url: '/book/api/books'
    })
}());