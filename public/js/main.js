$(function () {

    var Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },
        validate: function (attributes) {
            if (attributes.title === undefined) {
                return "Remember to set a title for your todo.";
            }
        },
        initialize: function () {
            this.on('change', function () {
                console.log('changed...');
            });
            this.on('invalid', function (model, error) {
                console.log(error);
            })
        }

    });

    var TodosCollection = Backbone.Collection.extend({
        model: Todo
    });

    var todo1 = new Todo({
        title: 'I am todo1',
        completed: true
    });
    var todo2 = new Todo({
        title: 'I am todo2'
    });
    var todo3 = new Todo({
        completed: true
    })


    var todos = new TodosCollection([todo1]);
    todos.add(todo2);
    todos.add(todo3);
    todos.remove(todo1);

    console.log(todos)

//    console.log(JSON.stringify(todo1));
//    console.log(todo1);
//    console.log(todo1.toJSON());
//    console.log(todo1.attributes);

    var TodoView = Backbone.View.extend({
        viewTpl: _.template("An example template. <h1><%= title %></h1><p><%= completed %></p>"),
        events: {
            'click h1': 'click'
        },
        initialize: function (options) {
            this.$parentEl = $('#todo');
            this.options = options || {};
            this.render();
        },
        render: function () {
            this.$el.html(this.viewTpl(this.model.toJSON()));
            this.$parentEl.append(this.el);
            return this;
        },
        click: function () {
            console.log('click....');
        }
    });
    var todoView = new TodoView({
        model: todo1
    });



});








