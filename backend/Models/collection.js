const {image,imageschema} = require("./image")
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:'string',
    images:[imageschema]
});

const collection = mongoose.model('Collection',schema);