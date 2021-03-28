const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//DB config
const db = require('./config/keys').MongoURI;

//passport config
require('./config/passport')(passport);

mongoose.connect(db,{useNewUrlParser:true , useUnifiedTopology: true})
  .then(() => console.log("mongo connected!!"))
  .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//bodyparser  to get data from form
app.use(express.urlencoded({ extended: false}));

//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

  //connect flash
  app.use(flash());

  app.use((req, res, next)=>{
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error_msg = req.flash('error_msg');
      next();
  })

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users')); 

const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`server started at port ${PORT}`));

