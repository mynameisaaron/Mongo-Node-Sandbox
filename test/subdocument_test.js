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

});