const router = require('express').Router();
const {Question, User} = require('../models');


router.get('/profile', (req, res) => {
    res.render('profile', {user:req.user});
});

router.get('/profile',  (req, res) => {
    res.render('website/profile', {
        user: req.user
    });
});

router.get('/profile/:userId', (req, res) => {
    User
        .findById(req.params.userId, {include: [Question]})
        .then((user) => {
            res.render('dashboard', {user, loggedInUser: req.user});
        });
});

module.exports = router;