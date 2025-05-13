import { emailTemplate } from './js-foundation/01-template';
import { env } from './js-foundation/02-destructuring';
//import { getUserById } from './js-foundation/03-callbacks';
import { getUserById } from './js-foundation/04-arrow';
import { getAge, getId } from './plugins';
import { buildMakePerson } from './js-foundation/05-factory';
import { getPokemonById } from './js-foundation/06-promises';
import { buildLogger } from './plugins';

// 01-template
console.log('Hello world');
console.log(emailTemplate);

// 03-callbacks
env;

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