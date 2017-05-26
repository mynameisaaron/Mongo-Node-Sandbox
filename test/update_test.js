//Update has three static methods and two methods on the object
//five update methods in total

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
            .then( (userArray) => {

                    assert(userArray.length === 1);
                    assert(userArray[0].name === 'Aaron');
                    done();

                });

    });

    it('update function on the object', (done)=>{
        joe.update({name:"Aaron Brightman"})
        .then(()=>User.find({}))
        .then((userArray)=>{
            assert(userArray.length === 1);
            assert(userArray[0].name === 'Aaron Brightman');
            done();
        })
    });

    it('static method find all record with a match and Update',(done)=>{

        //static  update takes two paramters, one is the filter then the givin data
        User.update({name:"Joe"},{name:"Alex"})
        .then(()=>User.find({}))
        .then((userArray)=>{
            assert(userArray.length === 1);
            assert(userArray[0].name === 'Alex');
            done();
        })

    });


    it('static method find single record with a match and Update',(done)=>{

        //static  update takes two paramters, one is the filter then the givin data
        User.findOneAndUpdate({name:"Joe"},{name:"Erin"})
        .then(()=>User.find({}))
        .then((userArray)=>{
            assert(userArray.length === 1);
            assert(userArray[0].name === 'Erin');
            done();
        })

    });

    it('static method, find one match by id and update',(done)=>{

        User.findByIdAndUpdate(joe._id,{name:'Rudolph'})
        .then(()=>User.find({}))
        .then((userArray)=>{
            assert(userArray.length === 1);
            assert(userArray[0].name === 'Rudolph');
            done();
        });

    });

//
    // new 'postCount property was added to the User Model
    //Here use 'Increment' Mongo Update Operator (Operators used with the update function)
    // https://docs.mongodb.com/manual/reference/operator/update/
    it('Increment postCount by one',(done)=>{

        User.update({name:'Joe'}, {$inc: { postCount : 1}})
        .then(() => User.findOne({name:'Joe'}))
        .then((userJoe)=>{
            assert(userJoe.postCount === 1);
            done();
        })
       
            
        });

    });



