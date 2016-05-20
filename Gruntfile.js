module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/js/_graph.js', 'src/js/_list.js', 'src/js/main.js'],
        dest: 'dist/js/script.js',
      },
    },
    uglify: {
      build: {
        src: 'dist/js/script.js',
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
    },
    watch: {
      js : {
        files: ['src/js/*.js', 'src/sass/main.scss'],
        tasks: ['concat', 'uglify']  
      },
      sass: {
        files: ['src/sass/*.scss'],
        tasks: ['compass']
      }
    }

  });

  // Load the plugin that provides task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'compass']);

};