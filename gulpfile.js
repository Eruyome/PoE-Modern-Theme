var gulp = require('gulp'),
	sass = require('gulp-sass'),
	nano = require('gulp-cssnano'),
	minifyCss = require('gulp-minify-css'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');

var imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

/* Compress images */
gulp.task('images', function() {
	return gulp.src('./theme/development/images/*.+(jpg|jpeg|gif|png|svg)')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./theme/production/images/'));
});

/* Compile sass and minify css */
gulp.task('styles', function() {
	/* Compile nested (adding @charset "utf-8") */
	gulp.src('./theme/development/scss/*.scss')
		.pipe(sass({outputStyle: 'nested'})
			.on('error', sass.logError))
		.pipe(gulp.dest('./theme/production/css/'))
	;
	/* Compile compressed (no added charset) */
	gulp.src('./theme/development/scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'})
			.on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		//.pipe(nano({zindex:false}))
		//.pipe(minifyCss())
		.pipe(cssmin({showLog :true,debug:true}))
		.pipe(gulp.dest('./theme/production/css/'))
	;
});

/* Watch sass file changes */
gulp.task('watch', function() {
	gulp.watch('./theme/development/scss/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch'], function() {

});