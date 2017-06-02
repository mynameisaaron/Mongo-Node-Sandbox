const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

before((done)=>{

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
.once('open', ()=>{done()})
.on('error', (error)=>{console.warn('Warning', error)});





});





beforeEach((done)=>{
    const {users, comments, blogposts} = mongoose.connection.collections;
    
   
    users.drop(()=>{
     
        blogposts.drop(()=>{

            comments.drop( () => {
                done();
            } );
        })
        
    })

})
