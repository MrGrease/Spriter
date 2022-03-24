const { default: mongoose } = require("mongoose");

const schema = new mongoose.schema({
    link:'string',
    rating:{type: 'Number', min:0,max:100}
});

const image = mongoose.model('Image',schema);

export default image;