const assert = require('assert');
const User = require('../src/user');

describe('Sub-Schema of User Model', () => {



    it('Saved User Object with Sub-schema', (done) => {
        const joe = new User({
            name: 'Joe1',
            posts: [{ title: 'Hello' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe1' }))
            .then((user) => {
                assert(user.posts[0].title === 'Hello')
            });
        done();
    });

    it('Add Subdocument to Existing Model-Object record from database', (done) => {



        var JoeRogan = new User({ name: 'Joe Rogan' });
        JoeRogan.save()
            .then(() => User.findOne({ name: 'Joe Rogan' }))
            .then((_joerogan) => {

                _joerogan.posts = [];
                _joerogan.posts.push({ title: 'here it is' });

                //the teacher stops nesting and returns the save()
               return _joerogan.save();
            })
            .then(() => User.findOne({ name: 'Joe Rogan' }))
            .then((_User) => {
                assert(_User.posts[0].title === 'here it is');
                done();
            })

    });





});





