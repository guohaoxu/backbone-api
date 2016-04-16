/*global Backbone, $ */
var app = app || {};
(function () {
    'use strict';
    app.BookView = Backbone.View.extend({
        tagName: 'div',
        className: 'bookTemplate',
        template: _.template($('#bookTemplate').html()),
        events: {
            'click .delete': 'deleteBook'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        deleteBook: function () {
            this.model.destroy();
            this.remove();
        }
    })
}());