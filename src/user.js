//user model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
{
    // Mongoose Validation on the Model
    name : 
    {
        type : String,
        required : [true, 'Name field required'],
        //add validate key for more advanced validation
        validate :{
            //validator will be called with the value of the name property
            //          must return a true or false
            validator : (name) => {
                if(name.length > 2){return true}
                else{return false}
            },
            message : 'Name must longer than two characters'
        }

    },
    postCount : Number
}

);

const User = mongoose.model('user', UserSchema);


module.exports = User;