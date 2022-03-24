import collection from './collection';
import image from './image'

const schema = new mongoose.schema({
    name:'string',
    email:'string',
    password:'string',
    collections:[collection],
    favourites:[image]
});

const user = mongoose.model('User',schema);

export default user;