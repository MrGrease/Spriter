import image from './image.js'

const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name:'string',
    images:[image]
});

const collection = mongoose.model('Collection',schema);

export default {collection}