module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'app.js', 'settings.js', 'public/**/*.js', '!public/lib/*.js', '!public/bootstrap/js/*.js', 'app/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        less: {
            dev: {
                files: {
                    'public/todo/css/main.css': 'public/todo/css/main.less'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['<%= jshint.files %>', '.jshintrc'],
                tasks: ['jshint']
            },
            less: {
                files: 'public/**/*.less',
                tasks: ['less']
            },
            static: {
                files: ['public/**/*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'less', 'watch']);
};

//