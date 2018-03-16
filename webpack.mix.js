const mix = require('laravel-mix');

mix.setPublicPath('test')
	.webpackConfig({ 'devtool': 'inline-sourcemap' })
	.setResourceRoot('test')
	.js('test/test.js', 'test/build.js')
	.browserSync('git.localhost');