const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//in the configuration object, sure to refference 'user' , same as it was referenced in the user.js
//const User = mongoose.model('user', UserSchema);
const CommentSchema = new Schema({
    content: String,
    user:{type:Schema.Types.ObjectId, ref:'user'}
});

const Comment = mongoose.model('comment',CommentSchema);
module.exports = Comment;