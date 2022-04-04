const mongoose = require("mongoose")

const imageschema = new mongoose.Schema({
    link:String,
    thumbNail:String,
    rating:{type: Number, min:0,max:100},
    tags:[String]
});

const image = mongoose.model('Image',imageschema);

module.exports = {image,imageschema};