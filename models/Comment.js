const sequelize = require('sequelize');

function defineComment(db) {
    const Comment = db.define('comment', {
        content: {
            type: sequelize.TEXT
        }
    });
    Comment.associate = ({ Question, User }) => {
        Comment.belongsTo(Question);
        Comment.belongsTo(User);
    };
    return Comment;
}

module.exports = defineComment;