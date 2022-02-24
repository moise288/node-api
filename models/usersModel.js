const mongoose = require('mongoose')

const UsersModel = mongoose.model(
    "node-api",
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    },
    "users"
);

const PostsModel = mongoose.model(
    "node-api",
    {
        author: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    "posts"
);
module.exports = {UsersModel}