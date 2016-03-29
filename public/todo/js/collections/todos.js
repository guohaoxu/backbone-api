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
            },
            initialize: function () {
                this.on('add', function () {
                    //console.log("app.todos is on add..");
                });
                this.on('reset', function () {
                    //console.log('app.todos is on reset.')
                });
            }
        });
    app.todos = new Todos();
}());