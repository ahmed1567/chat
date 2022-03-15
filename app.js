const http=require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt');

// const password = 'pass123';
// var hashedPassword;
  
// // Encryption of the string password
// bcrypt.genSalt(10, function (err, Salt) {
  
//     // The bcrypt is used for encrypting password.
//     bcrypt.hash(password, Salt, function (err, hash) {
  
//         if (err) {
//             return console.log('Cannot encrypt');
//         }
  
//         hashedPassword = hash;
//         console.log(hash);
  
        // bcrypt.compare(password, hashedPassword, 
        //     async function (err, isMatch) {
  
        //     // Comparing the original password to
        //     // encrypted password   
        //     if (isMatch) {
        //         console.log('Encrypted password is: ', password);
        //         console.log('Decrypted password is: ', hashedPassword);
        //     }
  
        //     if (!isMatch) {
              
        //         // If password doesn't match the following
        //         // message will be sent
        //         console.log(hashedPassword + ' is not encryption of ' 
        //         + password);
        //     }
        // })
//     })
// })



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const session=require('express-session');
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient({ socket: { port: 6379 } });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:"aaa",saveUninitialized:false,resave:false}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
