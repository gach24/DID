// Arrays methods

const tecnologias = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];
const numeros = [10, 20, 30, 40, 50];

console.log(tecnologias);
console.log(numeros);


function filter(tech) {    
    return tech !== 'React';
}

const newArray1 = tecnologias.filter(filter);

const newArray2 = tecnologias.filter(function filter(tech) {    
    return tech !== 'React';
});

const newArray3 = tecnologias.filter((tech) => tech !== 'React');

console.log(newArray1);
console.log(newArray2);
console.log(newArray3);

const greaterThan20 = numeros.filter(num => num > 20);
console.log(greaterThan20);

const isMember = tecnologias.includes('React');
console.log(isMember);
