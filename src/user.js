//user model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
{
    name : String
}

);

const User = mongoose.model('user', UserSchema);

//expost only the model class (convention)
module.exports = User;