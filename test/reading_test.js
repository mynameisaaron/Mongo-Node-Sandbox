const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => { done(); })
    });

    it('finds all users with a name of joe', (done) => {


        User.find({ name: "Joe" })
            .then((UsersFound) => {

                assert(joe._id.toString() === UsersFound[0]._id.toString());

                done();
            });

    })

    it('find one user with a particular property, like _id',(done)=>{

        User.findOne({_id:joe._id})
        .then((SingleUser)=>{
            
            assert(SingleUser.name === "Joe")
            //GOTCHYA, Carefull to execute done inside the promise
            done();
        });
        

        

    });

});
