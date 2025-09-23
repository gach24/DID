/// String
const alumno = "Germán";
console.log(alumno);
console.log(typeof alumno);

const edad = 30;
console.log(edad);
console.log(typeof edad);

// Number
const numero = 20.5;
const numero2 = 15;
const numero3 = -100;
const numero4 = "20";

console.log(typeof numero);
console.log(typeof numero2);
console.log(typeof numero3);
console.log(typeof numero4);


// BigInt
const numeroGrande = BigInt(9007199254741991);
console.log(numeroGrande);
console.log(typeof numeroGrande);
const otroNumeroGrande = 9007199254741991n;
console.log(otroNumeroGrande);
console.log(typeof otroNumeroGrande);

// Boolean
const verdadero = true;
const falso = false;
console.log(verdadero);
console.log(falso);
console.log(typeof verdadero);
console.log(typeof falso);

// Undefined
let variableSinValor;
console.log(variableSinValor);
console.log(typeof variableSinValor);
variableSinValor = "Ahora tengo un valor";
console.log(variableSinValor);
console.log(typeof variableSinValor);

// Null
const valorNulo = null;
console.log(valorNulo);
console.log(typeof valorNulo); // typeof null devuelve "object" (esto es un error en JavaScript)

// Symbol
const primerSymbol = Symbol("mi primer symbol");
const segundoSymbol = Symbol("mi primer symbol");
console.log(primerSymbol);
console.log(segundoSymbol);
console.log(primerSymbol === segundoSymbol);
console.log(typeof primerSymbol);


