// Objetos
let persona = {
  nombre: "Laura", // propiedad
  edad: 25,
  estudiante: true
};

console.log(persona);
console.table(persona);
console.log(typeof persona); 

console.log(persona.nombre); // "Laura"
console.log(persona["edad"]); // 25

// Modificar propiedades
persona.edad = 26;
persona["estudiante"] = false;

// Desestructuración
let { nombre, edad, estudiante } = persona;
console.log(nombre); // "Laura"
console.log(edad); // 26
console.log(estudiante); // false

// Agregar nuevas propiedades
persona.profesion = "Ingeniera";
persona["ciudad"] = "Madrid";

console.log(persona);

// Eliminar propiedades
delete persona.estudiante;
console.log(persona);

