
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
    posts : [PostSchema],
    blogPosts : [{type:Schema.Types.ObjectId, ref:'blogpost'}]
}

);


UserSchema.virtual('postCount').get(function(){
    return this.posts.length; 
});

// THERE ARE FOUR 'EVENTS' IN MONGOOSE CAN WATCH FOR
// EMIT - At intialization of model
// VALIDATE
// SAVE
// REMOVE
UserSchema.pre('remove',function(next){

    //1) We need to remove blogPost that belong to the user, right before removing the user
    //so, here we need access to blogPost model in the database:
    const BlogPost = mongoose.model('blogpost');


    // like virtual above, this keyword is availeable as 'the instance' of the user, when NOT USING the fat arrow function
    // ie, in the testing envronment, this === joe

    //2)  Remember that in user, there is an array of blogpost ids that we want to remove
    //   BUT WE DO NOT WANT TO ITERATE OVER THIS ARRAY AND REMOVE THEM ONE BY ONE
            // INSTEAD WE WANT TO USE A MONGOOSE FUNCTION HERE 
                // LIKE THE UPDATE OPERATORS (WE USED FOR INCREMENTING) > WE WANT TO USE THE MONGOOSE QUERRY OPERATOR

    BlogPost.remove({_id:{$in: this.blogPosts}})
    //inthe database look at BlogPosts
    //look at the _id field
    //remove all where the id is in the User object (ie joe's) array of blogPosts

    //3) Like all middleware, we call next, becuase we want these further executions (like deleting the user) to happen after (synchronously)
    .then(()=>next());
    
});


const User = mongoose.model('user', UserSchema);


module.exports = User;