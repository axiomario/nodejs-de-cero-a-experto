interface BuildMakePersonParams {
    getId: () => string;
    getAge: (birthdate: string) => number;
}

interface MakePersonParams {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ({getId, getAge}: BuildMakePersonParams) => {
    return ({ name, birthdate }: MakePersonParams) => {
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