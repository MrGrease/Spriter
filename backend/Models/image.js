const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    link:String,
    rating:{type: Number, min:0,max:100},
    tags:[String]
});

const image = mongoose.model('Image',schema);

module.exports = image;