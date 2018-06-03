const sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');

const db = new sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const models = requireModels(db, __dirname);

module.exports = Object.assign({ db }, models);