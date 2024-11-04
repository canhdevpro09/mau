var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//config mongoose
const mongoose = require('mongoose');
require('./model/Product')
require('./model/category')
require('./model/user')
require('./model/ProcductPet')
require('./model/CategoryPet')
require('./model/Duan')
require('./model/user_kotlin.js')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var studenttRouter = require('./routes/student');
var userRouter = require('./routes/user');
var productPetRouter = require('./routes/productPet');
var categoryPetRouter = require('./routes/categoryPet');
var nganhangRouter = require('./routes/nganhang');
var duanRouter = require('./routes/duan');
var user_kotlin = require('./routes/user_kotlin.js');


var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect database
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/student', studenttRouter);
app.use('/category', categoryRouter);
app.use('/user', userRouter);
app.use('/productPet', productPetRouter);
app.use('/categoryPet', categoryPetRouter);
app.use('/nganhang', nganhangRouter);
app.use('/Duan', duanRouter);
app.use('/kotlin', user_kotlin);


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
