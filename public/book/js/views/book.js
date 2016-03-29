/*global Backbone, $ */
var app = app || {};
(function () {
    'use strict';
    app.BookView = Backbone.View.extend({
        tagName: 'div',
        className: 'bookTemplate',
        template: _.template($('#bookTemplate').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    })
}());