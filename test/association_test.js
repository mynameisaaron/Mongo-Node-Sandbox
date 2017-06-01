const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');

describe('Associations',()=>{
let joe,blogpost,comment;
    beforeEach((done)=>{
        joe = new User({name:'Joe'});
        blogpost = new BlogPost({title:'Howdy',content:'HI there!'});
        comment = new Comment({content:'Congrats, on the great post'});

        //MONGOOSE automatically references these objects based on the model.
        joe.blogPosts.push(blogpost);
        blogpost.comments.push(comment);
        comment.user = joe;

        // Another new ES6 Feature for asynchronous saves, can combine all of the saves together,
        // and then all are saved before calling done()
        Promise.all([joe.save(),blogpost.save(),comment.save()])
        .then(()=>done());

    });

    it.only('Saves a relation between a user and a blogpost',(done)=>{
        User.findOne({name:'Joe'})
        .then((user)=>{
            console.log(user);
            done();
        })
    });
});