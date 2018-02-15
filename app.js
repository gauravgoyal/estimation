// var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var restify = require('restify');
//
// var index = require('./routes/index');
// var users = require('./routes/users');
//
// var app = restify();
//
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// // app.use(sassMiddleware({
// //   src: path.join(__dirname, 'public'),
// //   dest: path.join(__dirname, 'public'),
// //   indentedSyntax: true, // true = .sass and false = .scss
// //   sourceMap: true
// // }));
//
// // app.use('/', index);
// // app.use('/users', users);
//
// app.get('/', function (req, res, next) {
//   res.send('hello world');
//   next();
// });
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
