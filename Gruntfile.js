var childProcess = require('child_process');

module.exports = function(grunt) {

	config = {
		source : 'project/source/',
		static : 'project/static/',
		templates: 'project/source/templates/'
	};
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		assemble: {
			options: {
				layoutdir: config.templates+'layouts',
				layout: 'master-layout.hbs',
				partials: [ config.templates+'modules/**/*.hbs' ],
				flatten: false,
				expand: true,
				helpers: [config.templates+'helpers/*.js', 'handlebars-helpers'],
				data:config.templates+'data/**/*.json'
			},
			pages: {
				options: {
					layout: 'master-layout.hbs',
					helpers: [config.templates+'helpers/*.js', 'handlebars-helpers']
				},
				files: [
					{expand: true, ext: '.html', cwd: config.templates + 'pages/', src: '**/*.hbs', dest: config.static}
				]
			}
		},
		sass: {
			build: {
				files : [{
					expand: true,
					cwd : config.source + 'scss/',
					src: '*.scss',
					dest: config.static + 'css/',
					ext: '.css'
				}],
				options : {
					outputStyle : 'compressed'
				}
			}
		},
		watch: {
			sass: {
				files: [config.source + 'scss/{,**/}{,*.scss,*.sass}'],
				tasks: ['sass:build']
			},
			assemblePages: {
				files: [config.templates + '{,**/}{,*.hbs}', config.templates + '{,**/}{,*.json}'],
				tasks: [
					'assemble:pages'
				]
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					config.templates + '{,**/}*.html',
					config.static + '{,**/}*.{css,js,png,jpg,jpeg,gif,webp,svg}',
					config.source + '{,**/}*.{png,jpg,jpeg,gif,webp,svg,json}'
				]
			}
		},
		'http-server': {
			dev: {
				root: config.static,
				port: 8080,
				host: "127.0.0.1",
				// run in parallel with other tasks
				runInBackground: true,
				// customize url to serve specific pages
				customPages: {

				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-assemble');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-http-server');

	grunt.registerTask('build', [
		'assemble',
		'sass:build'
	]);

	grunt.registerTask('server', function (port) {
		grunt.task.run([
			'build',
			'http-server',
			'watch'
		]);
	});

	// Default task(s).
	grunt.registerTask('default', ['build']);

};