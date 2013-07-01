module.exports = function(grunt) {

	grunt.initConfig({
		'shell': {
			'options': {
				'stdout': true,
				'stderr': true,
				'failOnError': true
			},
			'cover': {
				'command': 'istanbul cover --report "html" --verbose --dir "coverage" "tests/tests.js"'
			},
			'fetch-entities': {
				'command': 'curl http://www.whatwg.org/specs/web-apps/current-work/multipage/entities.json | sed "s/  /\t/g" > data/entities.json'
			},
			'fetch-and-scrape-spec': {
				'command': 'phantomjs --load-images=no scripts/scrape-spec.js'
			},
			'process-data': {
				'command': 'node scripts/process-data.js'
			},
			'test-narwhal': {
				'command': 'echo "Testing in Narwhal..."; export NARWHAL_OPTIMIZATION=-1; narwhal "tests/tests.js"'
			},
			'test-phantomjs': {
				'command': 'echo "Testing in PhantomJS..."; phantomjs "tests/tests.js"'
			},
			// Rhino 1.7R4 has a bug that makes it impossible to test he.
			// https://bugzilla.mozilla.org/show_bug.cgi?id=775566
			// To test, use Rhino 1.7R3, or wait (heh) for the 1.7R5 release.
			'test-rhino': {
				'command': 'echo "Testing in Rhino..."; rhino -opt -1 "tests.js"',
				'options': {
					'execOptions': {
						'cwd': 'tests'
					}
				}
			},
			'test-ringo': {
				'command': 'echo "Testing in Ringo..."; ringo -o -1 "tests/tests.js"'
			},
			'test-node': {
				'command': 'echo "Testing in Node..."; node "tests/tests.js"'
			},
			'test-browser': {
				'command': 'echo "Testing in a browser..."; open "tests/index.html"'
			}
		},
		'curl': {
			'data/entities.json': 'http://www.whatwg.org/specs/web-apps/current-work/multipage/entities.json'
		},
		'template': {
			'build-he': {
				'options': {
					'data': function() {
						return require('./scripts/export-data.js');
					}
				},
				'files': {
					'he.js': ['src/he.js']
				}
			},
			'build-tests': {
				'options': {
					'data': function() {
						return {
							'testData': require('fs')
								.readFileSync('data/entities.json', 'utf-8').trim()
						}
					}
				},
				'files': {
					'tests/tests.js': ['tests/tests.src.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('cover', 'shell:cover');
	grunt.registerTask('ci', [
		'shell:test-narwhal',
		'shell:test-phantomjs',
		'shell:test-rhino',
		'shell:test-ringo',
		'shell:test-node',
	]);
	grunt.registerTask('test', [
		'ci',
		'shell:test-browser'
	]);

	grunt.registerTask('default', [
		'template',
		'shell:test-node'
	]);

	grunt.registerTask('build', [
		'shell:process-data',
		'default'
	]);

	grunt.registerTask('fetch', [
		'shell:fetch-entities',
		'shell:fetch-and-scrape-spec',
		'build'
	]);

};
