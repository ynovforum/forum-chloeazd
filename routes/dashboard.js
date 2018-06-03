const router = require('express').Router();
const {Question} = require('../models');


router.get('/dashboard', (req, res) => {
    console.log("string");
    Question.findAll().then((questions) => {
        res.render('dashboard', {
            questions
        });

    })
});

router.post('/dashboard', (req, res) => {
    const { title, content, resolu } = req.body;
    Question
        .sync()
        .then(() => Question.create({title, content, resolu, userId: req.user.id}))
        .then(() => res.redirect('/dashboard'));
});


module.exports = router;