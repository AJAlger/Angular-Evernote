var gulp = require('gulp');

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(__dirname + '/app'));
	app.listen(8080);
});

gulp.task('default', ['express'], function() {

});