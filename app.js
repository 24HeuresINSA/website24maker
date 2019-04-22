var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fileUpload = require('express-fileupload');

var https = require('https');
var fs = require('fs');

var indexRouter = require('./routes/index');
var animationsRouter = require('./routes/animations');
var preventionRouter = require('./routes/prevention');
var concertsRouter = require('./routes/concerts');
var billetterieRouter = require('./routes/billetterie');
var coursesRouter = require('./routes/courses');
var infosRouter = require('./routes/infos');

var app = express();

if (process.env.NODE_ENV != 'production' && false) {
	https.createServer({
		key: fs.readFileSync('./config/key.pem'),
		cert: fs.readFileSync('./config/cert.pem')
	}, app).listen(3001);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: "key",
	cookie: { maxAge: 10000000 }
}));
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static('public/javascripts'));
app.use('/img', express.static('public/images'));
app.use('/css', express.static('public/stylesheets'));
app.use('/documents', express.static('public/documents'));
app.use('/fonts', express.static('public/fonts'));

app.use('/', indexRouter);
app.use('/animations', animationsRouter);
app.use('/prevention', preventionRouter);
app.use('/concerts', concertsRouter);
app.use('/courses', coursesRouter);
app.use('/infos', infosRouter);
app.use('/billetterie', billetterieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
