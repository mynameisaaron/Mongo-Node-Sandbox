const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
.once('open', ()=>{console.log('good to go!')})
.on('error', (error)=>{console.warn('Warning', error)});


//Mocha is Asynchronous, needs to run this script to drop the data table -before starting the mocha test.
//ie, we need a guarantee that it will drop before the test runs.
/// use the mocha's .done() call back function to guarantee the order of operations

//1).drop will take a callback function that will file once its done droping the table

//2)lots of mocha function get call back with a done parameter 


beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
        // Ready to run the next test
        done();
    });
});