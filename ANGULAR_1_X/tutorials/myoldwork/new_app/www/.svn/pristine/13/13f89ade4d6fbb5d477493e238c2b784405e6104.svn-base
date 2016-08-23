// Generated on 2013-11-02 using generator-angular 0.4.0
'use strict';

var rewriteModule = require('http-rewrite-middleware'),
    lrSnippet = require('connect-livereload')(),
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

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
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}', 'bower_components/novafoundation/app/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles']
      },
      server: {
        options: {
          livereload: true
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{<%= yeoman.tmp %>,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{<%= yeoman.tmp %>,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/styles/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 5002,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      server: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              rewriteModule.getMiddleware([
                { from: '!(\.html|\.css|\.gif|\.jpeg|\.jpg|\.jpeg|\.ico|\.txt|\.js)$', to: '/index.html' }
              ]),
              mountFolder(connect, yeomanConfig.tmp),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              rewriteModule.getMiddleware([
                { from: '^(.*\.[^\/]+)$', to: '$1' },
                { from: '^\/.*$', to: '/index.html' }
              ]),
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
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
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '!<%= yeoman.dist %>/scripts/config.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/styles/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 5,
        pngquant: true,
        progressive: true,
        interlaced: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/styles/images'
        },{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: false,
          removeCommentsFromCDATA: true,
          removeCDATASectionsFromCDATA: true,
          collapseWhitespace: false,
          collapseBooleanAttributes: false,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: false,
          removeOptionalTags: false,
          removeEmptyElements: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      foundation: {
		files: [{
		  expand: true,
		  flatten: true,
	      cwd: '<%= yeoman.app %>',	
		  dest: '<%= yeoman.tmp %>/styles/images/',
		  src: [ 'bower_components/novafoundation/app/styles/images/*.{png,gif,jpg,jpeg}']        
		  }]
      },
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
            'scripts/config.js'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.tmp %>',
          dest: '<%= yeoman.dist %>/',
          src: [
            'styles/**/*.css'
          ]
        }, {
		  expand: true,
		  flatten: true,
	      cwd: '<%= yeoman.app %>',	
		  dest: '<%= yeoman.dist %>/styles/images/',
		  src: [ 'bower_components/novafoundation/app/styles/images/*.{png,gif,jpg,jpeg}']        
		}]
      }
    },
    concurrent: {
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      options: {
        beautify: true,
        mangle: false,
        compress: false,
        drop_console: true
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/bower_components/novafoundation/app/styles',
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

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build',
        'open',
        'connect:dist:keepalive'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'copy:foundation',      
      'compass:server',
      'connect:server',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'connect:test',
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'useminPrepare',
    'jshint:beforeconcat',
    'newer:concat',
    'jshint:afterconcat',
    'ngmin',
    'newer:uglify',
    'newer:cssmin',
    'newer:copy:dist',
    //'newer:imagemin', // has to happen after copy:dist
    'newer:htmlmin',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
