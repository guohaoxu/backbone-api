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
            this.$allCheckbox = this.$('#toggle-all');
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');
            this.$list = this.$('#todo-list');

            this.listenTo(app.todos, 'add', this.addOne);
            this.listenTo(app.todos, 'reset', this.addAll);
            this.listenTo(app.todos, 'filter', this.filterAll);
            this.listenTo(app.todos, 'all', this.render);

            this.listenTo(app.todos, 'change:completed', this.filterOne);

            app.todos.fetch({
                reset: true
            });
        },
        render: function () {
            var completed = app.todos.completedTodos().length,
                remaining = app.todos.remainTodos().length;
            if (app.todos.length) {
                this.$main.show();
                this.$footer.show();
                this.$allCheckbox.show();
                this.$footer.html(this.statusTemplate({
                    completed: completed,
                    remaining: remaining
                }));
                this.$('#filters li a').removeClass('selected').filter('[href="#/' + (app.TodoFilter || '') + '"]').addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
                this.$allCheckbox.hide();
            }
            this.$allCheckbox[0].checked = !remaining;
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
            _.invoke(app.todos.completedTodos(), 'destroy');
            return false;
        },
        toggleAllComplete: function () {
            var completed = this.$allCheckbox[0].checked;
            app.todos.each(function (todo) {
                todo.save({
                    completed: completed
                });
            });
        },
        addOne: function (todo) {
            var view = new app.TodoView({
                model: todo
            });
            this.$list.append(view.render().el);
        },
        addAll: function () {
            this.$list.html('');
            app.todos.each(this.addOne, this);
        },
        filterOne: function (todo) {
            todo.trigger('visible');
        },
        filterAll: function () {
            app.todos.each(this.filterOne, this);
        }
    });
}());

