const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dateofbirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    isverified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

module.exports = User;