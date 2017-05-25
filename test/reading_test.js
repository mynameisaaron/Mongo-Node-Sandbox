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
            //assert(joe._id === UsersFound[0]._id);
            //will write the assertion here in the it block's promise,
            //but this FAILED BECUASE THIS IS ACTUALLY NOT A STRING BUT AN ObjectId
assert(joe._id.toString() === UsersFound[0]._id.toString());

            done();
        });

    })

});
