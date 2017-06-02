const assert = require('assert');
const User = require('../src/user');

describe('Deleting a User', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {

        //this is actually not uncommon to chain promises together here
        joe.remove()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });







    });


    it('class method remove', (done) => {
        User.remove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });


   
    it('class method findOneAndRemove', (done) => {

        User.findOneAndRemove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((theFind) => {
                assert(theFind === null);
                done();
            })

    
});



    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
        .then(()=>User.findOne({name:'Joe'}))
        .then((theUser)=>{
            assert(theUser === null);
            done();
        });

     });





});