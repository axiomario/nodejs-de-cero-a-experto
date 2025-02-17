const fs = require('fs');
const data = fs.readFileSync('README.md', 'utf8');
const words = data.split(' ');
const reactCount = data.match(/react/gi).length;

console.log(words.length);
console.log({ reactCount });