const { getAll, create, getOne, remove, update } = require('../controllers/post.controllers');
const express = require('express');
const {verifyJwt} = require('../utils/verifyJWT');

const postRouters = express.Router();

postRouters.route('/')
    .get(getAll)
    .post(verifyJwt, create);//PROTECTED

postRouters.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)//PROTECTED
    .put(verifyJwt, update);//PROTECTED

module.exports = postRouters;