'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		
		
		, qunit: {
			all: ['test/*.html']
		}
		
		, 'http-server': {
 
			'dev': {
	 
				// the server root directory 
				root: '/Users/eduardoalmeida/apps/Veritaseum-proof-of-concept/',
	 
				// the server port 
				// can also be written as a function, e.g. 
				// port: function() { return 8282; } 
				port: 8282,
	 
				// the host ip address 
				// If specified to, for example, "127.0.0.1" the server will 
				// only be available on that ip. 
				// Specify "0.0.0.0" to be available everywhere 
				host: "0.0.0.0",
	 
				cache: '/Users/eduardoalmeida/apps/Veritaseum-proof-of-concept/',
				showDir : true,
				autoIndex: true,
	 
				// server default file extension 
				ext: "html",
	 
				// run in parallel with other tasks 
				runInBackground: false,//|false,
	 
				// specify a logger function. By default the requests are 
				// sent to stdout. 
				logFn: function(req, res, error) { },
	 
				// Proxies all requests which can't be resolved locally to the given url 
				// Note this this will disable 'showDir' 
				//proxy: "http://someurl.com",
	 
				/// Use 'https: true' for default module SSL configuration 
				/// (default state is disabled) 
				//https: {
				//	cert: "cert.pem",
				//	key : "key.pem"
				//}
	 
			}
	 
		}
		
		
		
		
		, watch: {
			scripts: {
				files: [
					'id-fix.js'
				]
				, tasks: [
					//'uglify'
					//,'jshint'
				]
				, options: {
					interrupt: true
				, }
			}
		}
		
		
		
		//my_src_files: ['foo/*.js', 'bar/*.js'],
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.registerTask('default', [ /*'readme'*/ ]);
};