const { getAll, create, getOne, remove, update } = require('../controllers/favorite.controllers');
const express = require('express');

const routerFavorite = express.Router();

routerFavorite.route('/')
    .get(getAll)
    .post(create);

routerFavorite.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerFavorite;