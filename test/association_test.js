const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');

describe('Associations', () => {
    let joe, blogpost, comment;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogpost = new BlogPost({ title: 'Howdy', content: 'HI there!' });
        comment = new Comment({ content: 'Congrats, on the great post' });

        
        joe.blogPosts.push(blogpost);
        blogpost.comments.push(comment);
        comment.user = joe;

        
        Promise.all([joe.save(), blogpost.save(), comment.save()])
            .then(() => done());

    });

    it('Saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe' })
            .then((user) => {
                assert(joe.name === 'Joe')
                done();
            })
    });

    it('Saves a relation between a user and a blogpost (with the populate modifier)', (done) => {
        User.findOne({ name: 'Joe' }).populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'Howdy');
                done();
            })
    });

    
    it('Populate the Whole Tree of the record, ie populate a nested record', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate:
                {
                    path: 'comments',
                    model: 'comment',
                    populate:
                    {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.blogPosts[0].comments[0].user.name === 'Joe')
                done();

            });

    });

});