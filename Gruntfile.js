'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		, qunit: {
			all: ['test/**/*.html']
		}
		
		
		
		, 'http-server': {
			'dev': {
				// the server root directory  ... please change it
				root: '/Users/eduardoalmeida/apps/Veritaseum-proof-of-concept/'
				, // the server port 
				// can also be written as a function, e.g. 
				// port: function() { return 8282; } 
				port: 8282
				, // the host ip address 
				// If specified to, for example, "127.0.0.1" the server will 
				// only be available on that ip. 
				// Specify "0.0.0.0" to be available everywhere 
				host: "0.0.0.0"
				, // the server cache directory  ... please change it
				cache: '/Users/eduardoalmeida/apps/Veritaseum-proof-of-concept/'
				, showDir: true
				, autoIndex: true
				, // server default file extension 
				ext: "html"
				, // run in parallel with other tasks 
				runInBackground: true
			, }
		}
	});
	//grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	
	grunt.loadNpmTasks('grunt-http-server');
	
	grunt.task.registerTask('qunittest', 'A sample task that run one test.', function(testname) {
            if(!!testname)
            	grunt.config('qunit.all', ['test/' + testname + '.html']);
            grunt.task.run('qunit:all');
    });
	
	grunt.registerTask('test', ['http-server:dev', 'qunittest:t']);
	grunt.registerTask('livetest', ['http-server:dev']);
	
	
	
	
	
	//grunt.registerTask('default', [ /*'readme'*/ ]);
};