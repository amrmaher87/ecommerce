var gulp = require('gulp');
var connect = require('gulp-connect');
var flipper= require('gulp-css-flipper');
var merge= require('merge-stream');

gulp.task('connect', async function() {
    connect.server({
        root:'build',
        livereload: true,
        port: 8080,
    })
});

gulp.task('watch', function() {
	return gulp.watch('src/**/*', gulp.series('build'));
});

gulp.task('html' , function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('build')).pipe(connect.reload());
});

gulp.task('css' , function(){
    var flip = gulp.src(['src/css/*.css', '!src/css/style.css']).pipe(flipper());
    var noFlip = gulp.src('src/css/style.css');

    return merge(flip, noFlip)
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

gulp.task('js' , function(){
    return gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js')).pipe(connect.reload());
});

gulp.task('fonts' , function(){
    return gulp.src('src/fonts/*')
    .pipe(gulp.dest('build/fonts')).pipe(connect.reload());
});

gulp.task('img' , function(){
    return gulp.src('src/img/*')
    .pipe(gulp.dest('build/img')).pipe(connect.reload());
});

gulp.task('build',gulp.series('html', 'css', 'js', 'fonts', 'img'));

gulp.task('default',gulp.series('build', 'connect', 'watch'));
