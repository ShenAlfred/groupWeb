var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var about = require('./routes/about');
var architecture = require('./routes/architecture');
var team = require('./routes/team');
var event = require('./routes/event');
var aptitude = require('./routes/aptitude');
var concat = require('./routes/concat');
var finacial = require('./routes/finacial');
var banking = require('./routes/banking');
var syonline = require('./routes/syonline');
var media = require('./routes/media');
var trends = require('./routes/trends');
var video = require('./routes/video');
var culture = require('./routes/culture');
var staff = require('./routes/staff');
var sitemap = require('./routes/sitemap');
var symap = require('./routes/symap');
var group_profile = require('./routes/group_profile');
var event_detail = require('./routes/event_detail');
var media_detail = require('./routes/media_detail');
var trends_detail = require('./routes/trends_detail');
var video_detail = require('./routes/video_detail');
var staff_detail = require('./routes/staff_detail');
var list = require('./routes/list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/about', about);
app.use('/about-architecture', architecture);
app.use('/about-team', team);
app.use('/about-event', event);
app.use('/about-aptitude', aptitude);
app.use('/about-concat', concat);
app.use('/property-finacial', finacial);
app.use('/property-banking', banking);
app.use('/property-syonline', syonline);
app.use('/news-media', media);
app.use('/news-trends', trends);
app.use('/news-video', video);
app.use('/culture', culture);
app.use('/culture-staff', staff);
app.use('/sitemap', sitemap);
app.use('/symap', symap);
app.use('/group_profile', group_profile);

app.use('/news/media/list', list);
app.use('/news/trends/list', list);
app.use('/news/video/list', list);
app.use('/culture/staff/list', list);

/*详情页面*/
app.use(event_detail);
app.use(media_detail);
app.use(trends_detail);
app.use(video_detail);
app.use(staff_detail);

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
  res.locals.status = res.statusCode;
  res.render('error');
});

module.exports = app;
