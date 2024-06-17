const { getAll, create, getOne, remove, update, login, logged, setFavorites } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');

const userRouters = express.Router();

//STATIC ROUTES
userRouters.route('/')
    .get(verifyJwt, getAll)//PROTECTED
    .post(create);

userRouters.route('/login')
    .post(login);

userRouters.route('/me')
    .get(verifyJwt, logged);

//HYBRID ROUTES:
userRouters.route('/:id/post')
    .post(setFavorites);

//DINAMIC ROUTES:
userRouters.route('/:id')
    .get(verifyJwt, getOne)//PROTECTED
    .delete(verifyJwt, remove)//PROTECTED
    .put(verifyJwt, update);//PROTECTED

module.exports = userRouters;