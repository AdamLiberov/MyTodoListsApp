const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const engine = require('ejs-mate');
const logger = require('morgan');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const listsRouter = require('./routes/lists');
const todosRouter = require('./routes/todos');
const subTodosRouter = require('./routes/subTodos');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');

const app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//models
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Adam:1111@cluster0-psthb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
const User = require('./models/user');
const List = require('./models/list');
const Todo = require('./models/todo');
//passport setup
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
const passport = require('passport');
const passport_local = require('passport-local');
const passport_local_mongoose = require('passport-local-mongoose');
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//actual app
app.use((req, res, next) => {
res.locals.user = req.user;
next();
});
app.get('/google39c3f6971f7ab84f.html', (req, res) => {
  res.send('google-site-verification: google39c3f6971f7ab84f.html');
})
app.use('/', indexRouter);
app.use('/lists', listsRouter);
app.use('/lists/:id/todos', todosRouter);
app.use('/lists/:id/todos/:_id/subTodos', subTodosRouter);
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
  console.log('wev got an err');
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
