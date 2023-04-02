require('dotenv').config();

/* var createError = require('http-errors'); */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

const memesRouter = require('./routes/memes');
const memeRouter = require('./routes/meme');
const prefetchMemesRouter = require('./routes/prefetchMemes')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json("memesOverview"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap-icons'));
app.use(express.static(path.join(__dirname, 'stylesheets')));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use(passport.authenticate('session'));


app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/memes', memesRouter);
app.use('/meme/', memeRouter);
app.use('/api/', prefetchMemesRouter)


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

