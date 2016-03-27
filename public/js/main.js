$(function () {

    var Todo = Backbone.Model.extend({

        initialize: function () {
            console.log('This model has been initialized.');
        },
        defaults: {
            title: '',
            completed: false
        }

    });

    var todo1 = new Todo({
        title: 'hehe'
    });

    todo1.on('change:title', function () {
        console.log('title changed')
    })

    todo1.set({
        title: 'heihei'
    }, {
        silent: true
    })

    console.log(JSON.stringify(todo1));
    console.log(todo1);
    console.log(todo1.toJSON());
    console.log(todo1.attributes);





});








