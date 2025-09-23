
// Funciones

function sumar() {
    console.log(1+1);
}
sumar();
sumar();
sumar();

function sumar1(numero1) {
    console.log(numero1);
}

sumar1(10, 20);
sumar1(30, 40);


function sumar2(numero1, numero2) {
    console.log(numero1 + numero2);
}
sumar2(10, 20);
sumar2(30, 40);
sumar2(50, 60);

// Funciones de expresión
const resta = function(a, b) {
  return a - b;
};
console.log(resta(5, 2));
