const assert = require('assert');
const User = require('../src/user');

describe('Validation Testing', () => {

    it('requires a user name', (done) => {

        var newUser = new User({ name: undefined, postCount: 0 });

       
        const ValidationResult = newUser.validateSync();

        if (ValidationResult) {
            
            const ValidationMessage = ValidationResult.errors.name.message;
            console.log(ValidationMessage);
        }

        assert(ValidationResult);
        done();


    });

    it('requires a user name (using the Asynchronous Method)', (done) => {

        var newUser = new User({ name: undefined });

        newUser.validate((_ValidationResult) => {
            console.log('Message from the Asynchronous Method : ' + _ValidationResult.errors.name.message)
            done();
        });

    });

    it('require as user name to be longer than two characters', (done) => {

        var newUser = new User({ name: 'Aa' });

        var validationObject = newUser.validateSync();


        assert(Boolean(validationObject));
        assert('Name must longer than two characters' === validationObject.errors.name.message)
        done();

    });

    it('Testing that an invalid User cannot be added to the database', (done) => {
        var someone = new User({ name: 'Xu' });

        
        someone.save()
            .catch(validationObject => 
            {
                const validationMessage = validationObject.errors.name.message;
                assert(validationMessage === 'Name must longer than two characters');
                done();
            });
    });

});