module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'src/js/script.js',
        dest: 'dist/js/script.min.js'
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'dist/css',
          environment: 'production'
        }
      },
    }

  });

  // Load the plugin that provides task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'compass']);

};