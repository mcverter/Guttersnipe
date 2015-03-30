// Generated on 2013-11-02 using generator-angular 0.4.0
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.tmp %>',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '<%= yeoman.tmp %>'
    },
    jshint: {
      all: ['Gruntfile.js', 'test/**/*.js'],
      beforeconcat: ['<%= yeoman.app %>/scripts/**/*.js'],
      afterconcat: ['<%= yeoman.tmp %>/concat/scripts/**/*.js']
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/',
          src: [
            '*.{ico,png,txt,html}',
            '.htaccess',
            'bower_components/**/*',
            'external_components/**/*',
            'views/**/*.html',
            'styles/**/*.css',
            'styles/fonts/**/*',
            'images/**/*.{png,gif,jpg,jpeg}',
            'styles/images/**/*.{png,gif,jpg,jpeg}',
            'scripts/**/*.js'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.tmp %>',
          dest: '<%= yeoman.dist %>/',
          src: [
            'styles/**/*.css'
          ]
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '<%= yeoman.tmp %>/styles',
        imagesDir: '<%= yeoman.app %>/styles/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: ['<%= yeoman.app %>/bower_components', '<%= yeoman.app %>/external_components'],
        httpImagesPath: 'styles/images',
        httpFontsPath: 'styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      server: {
        options: {
          debugInfo: true
        }
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/styles/images/generated'
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'jshint:beforeconcat',
    'newer:concat',
    'jshint:afterconcat',
    'newer:copy:dist'
  ]);

  grunt.registerTask('default', ['build']);
};
