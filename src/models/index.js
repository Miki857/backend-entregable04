const Post = require("./Post");
const User = require("./User");

User.belongsToMany(Post, {
    through: 'favorites',
    foreignKey: 'user_id',//user_id from favorite.
    otherKey: 'post_id'}//post_id from favorite.
);
Post.belongsToMany(User, {
    through: 'favorites',
    foreignKey: 'post_id',//post_id from favorite.
    otherKey: 'user_id'//user_id from favorite.
});