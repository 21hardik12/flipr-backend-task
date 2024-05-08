let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let dotenv = require('dotenv');
let mongoose = require('mongoose');
dotenv.config();

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const expenseRoutes = require('./routes/expenses');
const { authenticate } = require('./middleware/auth');

//connect to mongoDB
mongoose.set("strictQuery", "false");
const mongoDB = process.env.MONGODB_URI;

main().catch(err => {
  console.log(err)
});
async function main() {
  await mongoose.connect(mongoDB);
}



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use('/api/auth', authRoutes);
app.use('/api/categories', authenticate, categoryRoutes);
app.use('/api/expenses', authenticate, expenseRoutes);



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
