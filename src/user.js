
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
    likes : Number,
    posts : [PostSchema]
}

);

//1) virtual is always set after the schema decleration
//2) ES6 geter function, function IS NOT a fat-arrow function - becuase we need 'this' to equal the schema and not the whole file
UserSchema.virtual('postCount').get(function(){
    return this.posts.length; 
});



const User = mongoose.model('user', UserSchema);


module.exports = User;