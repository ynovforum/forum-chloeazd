const Sequelize = require('sequelize');

function defineUser(db) {
    const User = db.define('user', {
        firstname: {type: Sequelize.STRING},
        lastname: {type: Sequelize.STRING},
        bio: {type: Sequelize.STRING},
        role: {type: Sequelize.STRING},
        email: {type: Sequelize.STRING},
        password: {type: Sequelize.STRING}
    });
    User.associate = ({ Question, Comment }) => {
        User.hasMany(Question);
        User.hasMany(Comment);
    };
    return User;

}

module.exports = defineUser;