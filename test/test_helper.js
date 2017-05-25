const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
.once('open', ()=>{console.log('good to go!')})
.on('error', (error)=>{console.warn('Warning', error)});



beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
     
        done();
    });
});