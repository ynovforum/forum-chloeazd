const router = require('express').Router();
const {Question, Comment, User} = require('../models');


router.post('/addquestion', (req, res) => {
    const {title, content} = req.body;
    Question
        .sync()
        .then(() => Question.create({title, content, userId: req.user.id}))
        .then(() => res.redirect('/'));
});

router.post('/question/:questionId/resolu', (req, res) => {
    Question
        .sync()
        .then(() => Question.update({resolu: new Date()}, {where: {id: req.params.questionId}}))
        .then(() => res.redirect('/'));
});

router.get('/questions/:questionId', (req, res) => {
    Question
        .findById(req.params.questionId, {
            include: [
                User,
                {model: Comment, include: [User]}
            ]
        })
        .then((question) => {
            res.render('Question', {question, loggedInUser: req.user});
        });
});

router.post('/questions/:questionId', (req, res) => {
    const {title, content} = req.body;
    Comment
        .create({
            title,
            content,
            userId: req.user.id,
            questionId: req.params.questionId
        })
        .then(() => {
            res.redirect(`/questions/${req.params.questionId}`);
        });
});

router.post('/comment/:questionId', (req, res) => {
    const {content} = req.body;
    Comment
        .sync()
        .then(() => Comment.create({content, questionId: req.params.questionId, userId: req.user.id}))
        .then(() => res.redirect('/question/' + req.params.questionId));
});

module.exports = router;