const sequelize = require('sequelize');

function defineQuestion(db) {
    const Question = db.define('question', {
        title: {
            type: sequelize.STRING
        },
        content: {
            type: sequelize.STRING
        },
        resolu: {
            type: sequelize.DATE
        },
    });

    Question.associate = ({ User, Comment }) => {
        Question.belongsTo(User);
        Question.hasMany(Comment);
    };
    return Question;
}

module.exports = defineQuestion;