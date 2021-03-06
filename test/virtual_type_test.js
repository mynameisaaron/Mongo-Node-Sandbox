
const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types',()=>{

    it('Post Count returns number of posts',(done)=>{

        const user = new User({name:'Aces',posts:[{title:'Got it'}]});
        user.save()
        .then(()=>
            User.findOne({name:'Aces'})
        )
        .then(foundUser=>{
            assert(foundUser.postCount === 1);
            done();
        });

    });

});