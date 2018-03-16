const mix = require('laravel-mix');

mix.setPublicPath('test')
	.setResourceRoot('test')
	.js('test/test.js', 'test/build.js')
	.browserSync('git.localhost');