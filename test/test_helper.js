const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

before((done)=>{

//Connection Logic moved to before(done) block to guarantee that this connection to the database is run 
// exactly once before anything else

//after connection is successful the done function is run!

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
.once('open', ()=>{done()})
.on('error', (error)=>{console.warn('Warning', error)});





});





beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
     
        done();
    });
});