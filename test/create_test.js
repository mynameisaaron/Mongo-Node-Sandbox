const assert = require('assert');

const User = require('../src/user');

describe('Creating Records',()=>{
    it('saves a user',(done)=>{

        const joe = new User({name:'Joe Six-Pack'});

 
        joe.save()
        .then(()=>{
            assert(!joe.isNew);
            
            done();
        })
        .catch(()=>{console.log('there was a problem')});

    });
});