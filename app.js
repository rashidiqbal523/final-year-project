
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./server/models/User");
const expressSanitizer = require("express-sanitizer");
const connectDB = require("./server/config/db");
const { saveDummyData } = require("./createDummyData");

const app = express();
connectDB();

//configuration for app
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
//parse to body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//method override
app.use(methodOverride("_method"));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res, next) => { res.locals = ({ req: req }); next(); });
//sessions
const sessionConfig = {
  secret: "thisshouldbeabetttersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());
//HTML sanitization
app.use(expressSanitizer());

//authorization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//define middleware
app.use(async function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use('/', require('./server/routes'))

//error handling
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error", { err });
});

const port = 5001 || process.env.PORT;
app.listen(port, async () => {
  console.log(`App listeing on port ${port}`)

  await saveDummyData()
});
