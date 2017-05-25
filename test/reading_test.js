const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database',()=>{
let joe;

beforeEach((done)=>{
    joe = new User({name:'Joe'});
    joe.save()
    .then(()=>{done();})
});

    it('finds all users with a name of joe',(done)=>{
        
        //Static method of the model
        //find or findOne
        User.find({name:"Joe"})
        .then((UsersFound)=>{
            console.log(UsersFound);
            done();
        });

    })

});
