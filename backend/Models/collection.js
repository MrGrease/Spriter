const image = require("./image")
const mongoose = require("mongoose");
const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name:'string',
    images:[image]
});

const collection = mongoose.model('Collection',schema);