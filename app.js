var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



 app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



let models = require('./models')
models.sequelize.authenticate().then(() => {
  console.log("Connected to SQL database:", CONFIG.db_name);
  const schema = models.schemaCreate.then(() => {
    models.sequelize.sync()
  });
}).catch((err) => {
  console.error("Unable to connect to Postgres database:");
});

app.use('/employee',require('./controller/employee/employee.controller').router)
app.use('/department',require('./controller/settings/settings.controller').router)
app.use('/role',require('./controller/settings/settings.controller').router)
// catch 404 and forward to error handler
require('./swagger')
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
