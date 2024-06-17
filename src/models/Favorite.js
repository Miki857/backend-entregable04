const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const User = require('./User');
const Post = require('./Post');

const Favorite = sequelize.define('favorite', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  //USER TABLE
            key: 'id'     //PK
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,  //POST TABLE
            key: 'id'     //PK
        }
    }
});

module.exports = Favorite;