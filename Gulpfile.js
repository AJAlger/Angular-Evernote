var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		neat = require('node-neat').includePaths;


var paths = {

		sass: 'app/stylesheets/sass/',
		css: 'app/stylesheets/css/',
		script: 'app/scripts/'

};


gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(__dirname + '/app'));
	app.listen(8080);
});


// Gulp Task to SASS - Bourbon and Neat are working
gulp.task('styles', function() {
	return gulp.src(paths.sass + '*.scss')
		.pipe(sass({
			includePaths: ['styles'].concat(neat)
		}))
	.pipe(gulp.dest(paths.css))
});

gulp.task('scripts', function() {
	return gulp.src(paths.script)
});

gulp.task('default', ['express', 'styles'], function() {

});
