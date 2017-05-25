const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
.once('open', ()=>{console.log('good to go!')})
.on('error', (error)=>{console.warn('Warning', error)});


//This is the hook added.  Will Run beforeEach test
beforeEach(()=>{
    mongoose.connection.collections.users.drop();
});