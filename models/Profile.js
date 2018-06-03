const sequelize = require('sequelize');

function defineProfile(db) {
    const Profile = db.define('profile', {
        yourName: {
            type: sequelize.STRING
        },
        bio: {
            type: sequelize.STRING
        },
        email: {
        type: sequelize.STRING
        },
        password: {
        type: sequelize.STRING
    }
    });
    Profile.associate = ({ User, Comment }) => {
        Profile.belongsTo(User);
        Profile.hasMany(Comment);
    };
    return Profile;
}

module.exports = defineProfile;