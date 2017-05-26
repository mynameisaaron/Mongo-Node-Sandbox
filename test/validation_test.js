// Validation are the Advanced Features of the Mongoose API

const assert = require('assert');
const User = require('../src/user');

describe('Validation Testing', () => {

    it('requires a user name', (done) => {

        var newUser = new User({ name: undefined, postCount: 0 });

        //Here is the Mongoose Validation Object
        const ValidationResult = newUser.validateSync();

        if (ValidationResult) {
            //Usefull to remember this deeply nested Validation Message in the validation result object
            const ValidationMessage = ValidationResult.errors.name.message;
            console.log(ValidationMessage);
        }

        assert(ValidationResult);
        done();


    });

    it('requires a user name (using the Asynchronous Method)',(done)=>{

        var newUser = new User({name:undefined});

        newUser.validate((_ValidationResult)=>{
            console.log('Message from the Asynchronous Method : '+_ValidationResult.errors.name.message)
            done();
        });

    });

});