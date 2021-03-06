
const assert = require('assert');
const User = require('../src/user');

describe('Updateing a user', () => {
    let joe;



    beforeEach((done) => {
        joe = new User({ name: 'Joe', postCount: 0 });
        joe.save()
            .then(() => { done() });
    });




    it(' \'Set and Save\' method on the object', (done) => {
        joe.set('name', 'Aaron');
        joe.save()
            .then(() => User.find({}))
            .then((userArray) => {

                assert(userArray.length === 1);
                assert(userArray[0].name === 'Aaron');

                done();

            });

    });

    

    it('update function on the object', (done) => {
        joe.update({ name: "Brightman" })
            .then(() => User.find({}))
            .then((userArray) => {
                assert(userArray.length === 1);
                assert(userArray[0].name === 'Brightman');


                done();
            });
    });

    it('static method find all record with a match and Update', (done) => {

       
        User.update({ name: "Joe" }, { name: "Alex" })
            .then(() => User.find({}))
            .then((userArray) => {
                assert(userArray.length === 1);
                assert(userArray[0].name === 'Alex');
                done();
            })

    });


    it('static method find single record with a match and Update', (done) => {

      
        User.findOneAndUpdate({ name: "Joe" }, { name: "Erin" })
            .then(() => User.find({}))
            .then((userArray) => {
                assert(userArray.length === 1);
                assert(userArray[0].name === 'Erin');
                done();
            })

    });

    it('static method, find one match by id and update', (done) => {

        User.findByIdAndUpdate(joe._id, { name: 'Rudolph' })
            .then(() => User.find({}))
            .then((userArray) => {
                assert(userArray.length === 1);
                assert(userArray[0].name === 'Rudolph');
                done();
            });

    });

    
    it('Increment postCount by ten', (done) => {

        User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((userJoe) => {
                assert(userJoe.likes === 10);
                done();
            })


    });

});



