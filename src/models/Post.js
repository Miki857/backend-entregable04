const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const User = require('../models/User');

const Post = sequelize.define('post', {
    post: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  //USER TABLE
            key: 'id'     //PK
        }
    }
});

module.exports = Post;