/*global Backbone, $ */
var app = app || {};
(function () {
    'use strict';
    var Todos = Backbone.Collection.extend({
            model: app.Todo,
            localStorage: new Backbone.LocalStorage('myTodos'),
            completedTodos: function () {
                return this.where({
                    completed: true
                });
            },
            remainTodos: function () {
                return this.where({
                    completed: false
                });
            }
        });
    app.todos = new Todos();
}());