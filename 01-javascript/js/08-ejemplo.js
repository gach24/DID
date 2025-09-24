// Recorriendo arrays
const tecnologias = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];

console.log(tecnologias[0]);
console.log(tecnologias[1]);
console.log(tecnologias[2]);
console.log(tecnologias[3]);
console.log(tecnologias[4]);

for (let i = 0; i < tecnologias.length; i++) {
    console.log(tecnologias[i]);
}

tecnologias.forEach(function(tech) {
    console.log(tech);
});

tecnologias.forEach(tech => console.log(tech));

// for of
for (let tech of tecnologias) {
    console.log(tech);
}

// for in
for (let index in tecnologias) {
    console.log(tecnologias[index]);
}

// while
let i = 0;
while (i < tecnologias.length) {
    console.log(tecnologias[i]);
    i++;
}

// do while
let j = 0;
do {
    console.log(tecnologias[j]);
    j++;
} while (j < tecnologias.length);        
