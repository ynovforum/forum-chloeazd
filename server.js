const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { db, User } = require('./models');
const routes = require('./routes');


passport.use(new LocalStrategy((email, password, done) => {
    User
        .findOne({
            where: {
                email: email,
                password: password
            }
        }).then((user) => {
        if (user) {
            return done(null, user)
        } else {
            return done(null, false, {
                message: 'Invalid credentials'
            });
        }
    })
        .catch(done);
}));

passport.serializeUser((user, callback) => {
    callback(null, user.email);
});
passport.deserializeUser((email, callback) => {
    console.log("AUTH ATTEMPT",email);
    User.findOne({
        where : { email }
    }).then(user => {
        if(user) return callback(null, user);
        else return callback(new Error("No user corresponding to the cookie's email address"));
    });
});

const COOKIE_SECRET = 'cookie secret';
const app = express();

app.set('view engine', 'pug');
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: COOKIE_SECRET, resave: false, saveUninitialized: false }));
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

db.sync().then(() => {
    app.listen(3000);
})

