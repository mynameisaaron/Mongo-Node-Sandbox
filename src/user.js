
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = require('./post-schema');

const UserSchema = new Schema(
{
   
    name : 
    {
        type : String,
        required : [true, 'Name field required'],
        
        validate :{
            
            validator : (name) => {
                if(name.length > 2){return true}
                else{return false}
            },
            message : 'Name must longer than two characters'
        }

    },
    postCount : Number,
    posts : [PostSchema]
}

);

const User = mongoose.model('user', UserSchema);


module.exports = User;