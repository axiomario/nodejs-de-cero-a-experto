const { emailTemplate } = require('./js-foundation/01-template');
require('./js-foundation/02-destructuring');
//const { getUserById } = require('./js-foundation/03-callbacks');
const { getUserById } = require('./js-foundation/04-arrow');
const { getAge, getId } = require('./plugins');
const { buildMakePerson } = require('./js-foundation/05-factory');
const getPokemonById = require('./js-foundation/06-promises');

console.log('Hello world');
console.log(emailTemplate);

getUserById(2, (error, user) => {
    if (error) {
        throw new Error(error);
    }

    console.log(user);
});

const makePerson = buildMakePerson({ getId, getAge });
const obj = { name: 'Mario', birthdate: '1983-05-07' };
console.log(makePerson(obj));

getPokemonById(2)
    .then(console.log)
    .catch(error => console.log(error));