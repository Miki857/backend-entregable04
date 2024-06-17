const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({...req.body, password: hashedPassword});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    // const obj = {
    //     nickname: "pepito",
    //     email: "aslkjdaslk@jasj.com",
    //     password: "jashdals"
    // }

    delete req.body.password;//DELETE PASSWORD IF EXISTS.
    delete req.body.email;//DELETE PASSWORD IF EXISTS.

    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const {email, password} = req.body;//GET EMAIL AND PASSWORD FROM FRONT-END.
    
    const user = await User.findOne({where: {email: email}});//CHECK IF EMAIL EXISTS.
    if(!user) return res.sendStatus(401).json({error: "Credenciales Invalidas"});
    
    const isValid = await bcrypt.compare(password, user.password);//CHECK PASSWORD.
    if(!isValid) return res.sendStatus(401).json({error: "Credenciales Invalidas"});

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: "1d"}
    );

    return res.json({user, token});
});

const logged = catchError(async(req, res) => {
    const user = req.user;
    return res.json(user);
});

const setFavorites = catchError(async(req, res) => {
    const { id } = req.params;//Id del usuario.
    const user = await User.findByPk(id);//Lo localizo.
    if(!user) return res.sendStatus(404);//Si todo esta en orden.
    await user.setPosts(req.body);//Le agrego.
    const post = await user.getPosts();//Traigo lo agregado para mostralo en la vista.
    if(!post) return res.sendStatus(404);//Si todo esta en orden.    
    const updatedUser = await User.findByPk(id, {include: [Post]});
    return res.json(updatedUser);//Retornamos la vista.
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged,
    setFavorites
}