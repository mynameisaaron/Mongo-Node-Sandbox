const assert = require('assert');

const User = require('../src/user');

describe('Creating Records',()=>{
    it('saves a user',(done)=>{

        const joe = new User({name:'Joe Six-Pack'});

        //using US6 promises to create syncronous order or events
        joe.save()
        .then(()=>{
            assert(!joe.isNew);
            //in Mocha done() is available to every it() block and beforeEach() block
            done();
        })
        .catch(()=>{console.log('there was a problem')});

    });
});