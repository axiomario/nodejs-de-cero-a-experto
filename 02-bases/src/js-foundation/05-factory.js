const buildMakePerson = ({ getId, getAge }) => {
    return ({ name, birthdate }) => {
        return {
            id: getId(),
            name,
            birthdate,
            age: getAge(birthdate)
        };
    };
};

/*const buildPerson = ({ name, birthdate }) => {
    return {
        id: getId(),
        name,
        birthdate,
        age: getAge(birthdate)
    };
};*/

module.exports = {
    buildMakePerson
};