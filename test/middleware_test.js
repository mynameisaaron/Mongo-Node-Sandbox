const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');




describe('MiddleWare',()=>{
    let joe, blogpost1, blogpost2, blogpost3;

    beforeEach(done=>{
        joe = new User({name:'Joe'});
        blogpost1 = new BlogPost({title:"BLOGPOST1'S TITLE",content:"BLOGPOST1'S CONTENT"});
        blogpost2 = new BlogPost({title:"BLOGPOST2'S TITLE",content:"BLOGPOST2'S CONTENT"});
        blogpost3 = new BlogPost({title:"BLOGPOST3'S TITLE",content:"BLOGPOST3'S CONTENT"});
        joe.blogPosts.push(blogpost1);
        joe.blogPosts.push(blogpost2);
        joe.blogPosts.push(blogpost3);
        
        Promise.all([joe.save(),blogpost1.save(),blogpost2.save(),blogpost3.save()])

        .then(()=>done());
        

    });

    it("test that the test is setup",(done)=>{
        User.find({name:'Joe'})
        .then((finding)=>{
            assert(finding.length === 1);
            assert(finding[0].blogPosts.length === 3);
            done();
        });
        
    });

    it('test that the test is setup part2',done=>{
        BlogPost.count()
        .then(bpnumber=>{
            assert(bpnumber === 3);
            done();
        });
    });

    it('Delete User, test that cascade delete works',(done)=>{
        joe.remove()
        .then(()=>{
           BlogPost.count()
           .then(bpnumber=>{
               assert(bpnumber === 0);
               done();
           }) 
        });
        
        
    });


});