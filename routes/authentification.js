const router = require('express').Router();
const passport = require('passport');
const { User} = require('../models');


router.get('/', (req, res) => {
    if (req.user !== undefined && req.user !== null) {
        console.log(req.user);
        res.render('home', {user: req.user.dataValues});
    } else {
        res.redirect("/login");
    }
});

router.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: 'dashboard',
    failureRedirect: '/login'
}));

router.get('/registration', (req, res) => {
    if (req.user) {
        return res.redirect('/login');
    }

    res.render('registration');
});

router.post('/registration', (req, res) => {
    User.create({
        email: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role,
        bio: req.body.bio
    })
        .then((user) => {
            req.login(user, function (err) {
                if (err) {
                    console.error(err);
                    res.redirect('/registration');
                } else {
                    res.redirect('/dashboard');
                }
            });
        })
        .catch((err) => {
            console.error(err);
            if (err) {
                res.send(500);
            }
        });
});

module.exports = router;