const image = require("./image")
const collection = require("./collection")
const schema = new mongoose.schema({
    name:'string',
    email:'string',
    password:'string',
    collections:[collection],
    favourites:[image]
});

const user = mongoose.model('User',schema);