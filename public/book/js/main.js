/*global Backbone, $ */
var app = app || {};
(function () {
    'use strict';
    $('#releaseDate').datepicker();
    new app.LibraryView();
}());