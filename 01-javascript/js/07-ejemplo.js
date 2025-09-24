// Destructuring arrays
const tecnologias = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];

const react = tecnologias[3];

console.log(react); 

const [html, css, js, react1, node] = tecnologias;

console.log(html);
console.log(css);
console.log(js);
console.log(react1);
console.log(node);

const [ , , , r] = tecnologias;

console.log(r);
