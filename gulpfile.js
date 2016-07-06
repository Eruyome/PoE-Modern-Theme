var gulp = require('gulp'),
	sass = require('gulp-sass'),
	//nano = require('gulp-cssnano'),
	//minifyCss = require('gulp-minify-css'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	gitmodified = require('gulp-gitmodified'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

/* Compress images (gitmodified) */
gulp.task('images:gitmodified', function() {
	return gulp.src('./theme/development/images/*.+(jpg|jpeg|gif|png|svg)')
		.pipe(gitmodified('modified'))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./theme/production/images/'));
});

/* Compress images (all) */
gulp.task('images:all', function() {
	return gulp.src('./theme/development/images/*.+(jpg|jpeg|gif|png|svg)')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./theme/production/images/'));
});


/* Compile sass and minify css (gitmodified*/
gulp.task('styles:gitmodified', function() {
	/* Compile nested (adding @charset "utf-8") */
	gulp.src('./theme/development/scss/*.scss')
		.pipe(gitmodified('modified'))
		.pipe(sass({outputStyle: 'nested'})
			.on('error', sass.logError))
		.pipe(gulp.dest('./theme/production/css/'))
	;
	/* Compile compressed (no added charset) */
	gulp.src('./theme/development/scss/*.scss')
		.pipe(gitmodified('modified'))
		.pipe(sass({outputStyle: 'compressed'})
			.on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		//.pipe(nano({zindex:false}))
		//.pipe(minifyCss())
		.pipe(cssmin({showLog :true,debug:true}))
		.pipe(gulp.dest('./theme/production/css/'))
	;
});

/* Compile sass and minify css (all) */
gulp.task('styles:all', function() {
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


gulp.task('default', ['styles:all', 'images:all'], function() {
	// Watch Stylesheets
	gulp.watch('./theme/development/scss/*.scss', ['styles:gitmodified']);
	// Watch Images
	gulp.watch(['./theme/development/images/**/*.+(jpg|jpeg|gif|png|svg)'], ['images:gitmodified']);
});