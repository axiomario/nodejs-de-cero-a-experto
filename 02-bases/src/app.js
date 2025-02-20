const { emailTemplate } = require('./js-foundation/01-template');
require('./js-foundation/02-destructuring');
//const { getUserById } = require('./js-foundation/03-callbacks');
const { getUserById } = require('./js-foundation/04-arrow');
const { getAge, getId } = require('./plugins');
const { buildMakePerson } = require('./js-foundation/05-factory');
const getPokemonById = require('./js-foundation/06-promises');
const { buildLogger } = require('./plugins');

// 01-template
console.log('Hello world');
console.log(emailTemplate);

// 03-callbacks
// 04-arrow
getUserById(2, (error, user) => {
    if (error) {
        throw new Error(error);
    }

    console.log(user);
});

// 05-factory
const makePerson = buildMakePerson({ getId, getAge });
const obj = { name: 'Mario', birthdate: '1983-05-07' };
console.log(makePerson(obj));

// 06-promises
getPokemonById(2)
    .then(console.log)
    .catch(error => console.log(error));

// logger
const logger = buildLogger('app.js');

logger.log('hello world');
logger.error('this is an error');