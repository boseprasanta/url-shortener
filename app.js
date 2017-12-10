var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./configuration/config');
var mongoose=require('mongoose');
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
var counter=require('./models/counter');
var index = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
counter.find({},function(err,data)
	{
		if(data.length==0){
			var counterInstance=new counter({ _id: 'url_count', seq: 10000 });
			counterInstance.save(function(err){
				if(!err){
					console.log('counter initialised');
				}

			});
		}
		
	});
app.use('/', index);


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
  res.render('error');
});

module.exports = app;
