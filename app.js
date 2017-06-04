const express = require('express');
const ehbs = require('express-handlebars');
const path = require('path');
const database = require('./config/database').datastore.database;

const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');

// routers
const index = require('./routes/index');
const users = require('./routes/users/index');

// application
const app = express();

mongoose.connect(database);
require('./config/passport');

// view engine & views
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', ehbs({defaultLayout: 'layout', extename: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(session({
    secret: 'goodlucktoyou',
    resave:false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// static resources
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error:err,message:res.locals.message});
});

// server port
app.set('port',(process.env.PORT || 3000));

// start server
app.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'));
});
