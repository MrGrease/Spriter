const {image,imageschema} = require("./image")
const collection = require("./collection")
const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name:'string',
    email:'string',
    password:'string',
    collections:[collection],
    favourites:[imageschema]
});

const user = mongoose.model('User',schema);