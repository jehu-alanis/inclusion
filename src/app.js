const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      multer= require('multer'),
      pdfRoute = require('./routes/customer'),
       flash = require('connect-flash'),
      validator = require('express-validator'),
      myConnection = require('express-myconnection');
      app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');




var passport = require('passport');
//var flash = require('connect-flash');
app.use('/pdfMake', pdfRoute);
const { database } = require('./keys');

// Intializations
require('./lib/passport');

// importing routes

const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '7umdertaker',
  port: 3306,
  database: 'itsx_inclusion'
}, 'single'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

  
app.use(session({
  secret: 'justasecret',
  resave:true,
  saveUninitialized: true
 }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});






// routes
app.use(require('./routes/authentication'));

app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));










app.use(express.json());
app.use(express.urlencoded({ extended: true }));













// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
