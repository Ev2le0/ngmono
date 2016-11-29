module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: './public/js',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.registerTask('default',['bower']);
};