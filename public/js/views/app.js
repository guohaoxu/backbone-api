/*jslint nomen: true*/
/*global Backbone, $, _, ENTER_KEY, ESC_KEY */
var app = app || {};
(function () {
    'use strict';
    app.AppView = Backbone.View.extend({
        el: '#todoapp',
        statusTemplate: _.template($('#status-template').html()),
        events: {
            'keypress #new-todo': 'createTodo',    //创建一条记录
            'click #clear-completed': 'clearCompleted',    //删除已经完成的
            'click #toggle-all': 'toggleAllComplete'    //选择全部或者取消全选
        },
        initialize: function () {
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');
            this.$list = this.$('#list');

            this.listenTo(app.Todos, 'add', this.addOne);
            this.listenTo(app.Todos, 'reset', this.addAll);

            this.listenTo(app.Todos, 'change:completed', this.filterOne);

            app.todos.fetch({
                reset: true
            });
        },
        render: function () {
            var completed = app.Todos.completedTodos().length;
            var remaining = app.Todos.remainTodos().length;
            if (app.Todos.length) {
                this.$main.show();
                this.$footer.show();
                this.$footer.html(this.statusTemplate({
                    completed: completed,
                    reamining: remaining
                }));
                /*this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (app.TodoFilter || '') + '"]')
                    .addClass('selected');*/
            } else {
                this.$main.hide();
                this.$footer.hide();
            }
            this.allCheckbox.checked = !remaining;
        },
        createTodo: function (e) {
            if (e.which === ENTER_KEY && this.$input.val().trim()) {
                app.todos.create({
                    title: this.$input.val().trim(),
                    completed: false
                });
                this.$input.val('');
            }
        },
        clearCompleted: function () {
            _.invoke(app.todos.completed(), 'destroy');
            return false;
        },
        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;
            app.todos.each(function (todo) {
                todo.save({
                    completed: completed
                })
            })
        },
        addOne: function (todo) {
            var view = new app.TodoView({
                model: todo
            })
        },
        addAll: function () {
            this.$list.html('');
            app.todos.each(this.addOne, this);
        }
    });
}());

