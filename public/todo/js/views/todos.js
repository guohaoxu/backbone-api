/*jslint nomen: true*/
/*global Backbone, $, _, ENTER_KEY, ESC_KEY */
var app = app || {};
(function () {
    'use strict';
    app.TodoView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: _.template($('#item-template').html()),
        events: {
            'click .toggle': 'toggleTodo',  //点击checked=true 或者 checked=false
            'dblclick label': 'editTodo',   //双击标题 进入编辑状态
            'click .destroy': 'closeTodo',  //点击关闭按钮 删除一条记录
            'keypress .edit': 'updateTodo', //输入框输入 判断是否按下Enter回车键
            'keydown .edit': 'escUpdateTodo',   //按esc键退出编辑状态
            'blur .edit': 'overUpdate'  //输入完成
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        },
        toggleTodo: function () {
            this.model.toggle();
        },
        toggleVisible: function () {
            this.$el.toggleClass('hide', this.isHidden());
        },
        isHidden: function () {
            var isCompleted = this.model.get('completed');
            return (
                (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
            );
        },
        editTodo: function () {
            this.$el.addClass('editing');
            this.$input.focus();
        },
        closeTodo: function () {
            this.model.destroy();
        },
        updateTodo: function (e) {
            if (e.which === ENTER_KEY) {
                this.overUpdate();
            }
        },
        escUpdateTodo: function (e) {
            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
                this.$input.val(this.model.get('title'));
            }
        },
        overUpdate: function () {
            var value = this.$input.val().trim();
            if (value) {
                this.model.save({
                    title: value
                });
            } else {
                this.model.destroy();
            }
            this.$el.removeClass('editing');
        }
    });
}());