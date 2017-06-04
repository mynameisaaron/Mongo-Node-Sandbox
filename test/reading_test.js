const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe, alex, maria, terrence, victor, william, zander;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        alex = new User({ name: 'Alex' });
        maria = new User({ name: 'Maria' });
        terrence = new User({ name: 'Terrence' });
        victor = new User({ name: 'Victor' });
        william = new User({ name: 'William' });
        zander = new User({ name: 'Zander' });
        
        Promise.all([joe.save(),alex.save(),maria.save(),terrence.save(),victor.save(),william.save(),zander.save()])
        .then(() =>  done() );
    });

    it('finds all users with a name of joe', (done) => {


        User.find({ name: "Joe" })
            .then((UsersFound) => {

                assert(joe._id.toString() === UsersFound[0]._id.toString());

                done();
            });

    });

    it('find one user with a particular property, like _id',(done)=>{

        User.findOne({_id:joe._id})
        .then((SingleUser)=>{
            
            assert(SingleUser.name === "Joe");
           
            done();
        });
        

        

    });

    it('Can skip and limit and sort',done=>{
        //sort by a property, 
        //property value can be 1 or negative one for assending and decending sort
        User.find({}).sort({name:-1}).skip(1).limit(2)
        .then(data=>{
           assert(data.length === 2);
           assert(data[0].name === 'William');
           assert(data[1].name === 'Victor');
       
           done();
        })
    });

});
