module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'app.js', 'settings.js', 'public/js/main.js', 'app/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        less: {
            dev: {
                files: {
                    'public/css/main.css': 'public/css/main.less'
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
                files: 'public/css/*.less',
                tasks: ['less']
            },
            static: {
                files: ['public/*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'less', 'watch']);
};

//