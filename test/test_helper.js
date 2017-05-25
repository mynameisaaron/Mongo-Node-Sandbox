const mongoose = require('mongoose');

//telling mongoose that we want to use the ES6 to make a promise, just like node's global promise
////deprication message removed
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
.once('open', ()=>{})
.on('error', (error)=>{console.warn('Warning', error)});



beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
     
        done();
    });
});