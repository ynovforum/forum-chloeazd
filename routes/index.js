const router = require('express').Router();
const dashboard = require('./dashboard');
const admin = require('./admin');
const questions = require('./questions');
const profile = require('./profile');
const authentification = require('./authentification');

function isAuthenticated(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }

    return res.redirect('/');
}

router.use('/', dashboard);
router.use('/', questions);
router.use('/', profile);
router.use('/', authentification);
router.use('/admin', isAuthenticated, admin);

module.exports = router;