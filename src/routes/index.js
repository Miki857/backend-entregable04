const express = require('express');
const router = express.Router();

// colocar las rutas aquí
const routerUser = require('./user.routers');
const routerPost = require('./post.routers');

router.use('/users', routerUser);
router.use('/posts', routerPost);


module.exports = router;