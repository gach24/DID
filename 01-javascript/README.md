# Introducción a JS

## Pasos

- [Instalar VSC](https://code.visualstudio.com/Download) 
- [Instalar la extensión Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


## Ejemplos

### 01. Variables con let

JS permite declarar variables utilizando *var*, *let*, y *const*

Para la declaración la utilización de ***var*** no se recomienda, ***let*** permite declarar una variable

- El nombre de las variables siguen los estandares de cualquier lenguaje de programación

- JS es un lenguaje no tipado y dinámico

```js
let client = "Germán";
cliente = 'Ana';
cliente = 20;
console.log(client);
```

- ***let*** a diferencia de ***const*** permite la inicialización de la variable sin ningún valor ***(undefined)***

```js
let precio;
console.log(precio);
precio = 20.5;
console.log(precio);
```

### 02. Variables con const

Las variables declaradas con ***const*** no se pueden reasignar

```js
const client = "Germán"
client = 'Ana' // Error
```

Las variables con ***const*** (constantes) deben tener un valor inicial

```js
// const precio;
const precio = 20;
console.log(precio); // Error
```

### 03. Tipos de datos

Son inmutables y se pasan por valor.

1. ***string***. Cadenas de texto
```js
let nombre = "Juan";
let saludo = 'Hola';
let mensaje = `Bienvenido ${nombre}`;
```

2. ***number***. Números (enteros y decimales, incluidos NaN e Infinity).
```js
let edad = 25;
let pi = 3.1416;
let infinito = Infinity;
let noNumero = NaN;
```

3. ***booelan***. Valores lógicos: true o false
```js
let activo = true;
let mayor = false;
```

4. ***undefined***. Variable declarada pero sin valor asignado
```js
let x;
console.log(x); // undefined
```

5. ***null***. Ausencia intencional de valor.
```js
let vacio = null;
```

6. ***symbol***. (ES6) Valores únicos e inmutables, útiles como identificadores
```js
let id = Symbol("id");
```

7. ***bigint***. (ES2020). Números enteros muy grandes que no caben en number.
```js
let numeroGrande = 1234567890123456789012345678901234567890n;
```

También tenemos tipos de datos no primitivos

1. ***Object***. Estrutura clave/valor
```js
let persona = { nombre: "Ana", edad: 30 };
```

2. ***Array***. Lista no ordenada
```js
let numeros = [1, 2, 3, 4];
```

3. ***Function***. En JS las funciones son un objeto de primera clase
```js
function saludar() { return "Hola"; }
```

4. ***Date, RegExp, Map, Set, WeakMap, WeakSet***. Tipos especiales basados en objetos.
```js
let hoy = new Date();
let mapa = new Map();
let conjunto = new Set([1, 2, 3]);
```

### 04. Objetos y desestructuración

Un objeto es una colección de propiedades, (clave -> valor)

```js
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
```

La desestructuración de objetos nos permite acceder a las propiedades de los objetos de forma más cómoda

```js
const persona = {
  nombre: "Carlos",
  edad: 28,
  ciudad: "Madrid"
};

const { nombre, edad } = persona;

console.log(nombre); // "Carlos"
console.log(edad);   // 28

// Cambiando el nombre de la variable
const { ciudad: lugar } = persona;
console.log(lugar); // "Madrid"

// Con valores por defecto
const { pais = "España" } = persona;
console.log(pais); // "España"
```

### 05. Funciones

Una **función** es un bloque de código que se puede reutilizar.  
Sirve para **encapsular lógica** y ejecutarla cuando la necesitemos.

```js
function saludar() {
  console.log("¡Hola!");
}
saludar(); // Ejecuta la función
```

Funciones de expresión (función anónima asignada a una variable)
```js
const resta = function(a, b) {
  return a - b;
};
console.log(resta(5, 2)); // 3
```

Funciones Flecha (Arrow Functions)
```js
const multiplicar = (a, b) => a * b;
console.log(multiplicar(3, 4)); // 12
```

Parámetros y Valores por Defecto
```js
function saludar(nombre = "invitado") {
  console.log(`Hola, ${nombre}`);
}
saludar();
```


Parámetros Rest y Operador Spread
```js
function sumar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log(sumar(1, 2, 3, 4)); 
```

Funciones como valores, en JavaScript las funciones pueden guardarse en variables, pasarse como argumentos y devolverse.
```js
function aplicarOperacion(a, b, operacion) {
  return operacion(a, b);
}

const dividir = (x, y) => x / y;
console.log(aplicarOperacion(10, 2, dividir)); // 5
```

Funciones Anidadas y Closures, una función puede estar dentro de otra y recordar su contexto.
```js
function crearContador() {
  let contador = 0;
  return function() {
    contador++;
    return contador;
  };
}

const contar = crearContador();
console.log(contar()); // 1
console.log(contar()); // 2
```

### 06. Array methods

Añadir y eliminar elementos
```js
// push() → Añade al final
numeros.push(6); // [1,2,3,4,5,6]

// pop() → Elimina el último
numeros.pop(); // [1,2,3,4,5]

// unshift() → Añade al inicio
numeros.unshift(0); // [0,1,2,3,4,5]

// shift() → Elimina el primero
numeros.shift(); // [1,2,3,4,5]
```

Buscar elementos
```js
// indexOf() → Devuelve el índice del elemento
numeros.indexOf(3);

// includes() → Verifica si existe
numeros.includes(4);
```

Recorrer arrays
```js
// forEach() → Ejecuta una función por cada elemento
numeros.forEach(n => console.log(n));

// map() → Crea un nuevo array transformado
let dobles = numeros.map(n => n * 2); // [2,4,6,8,10]


// filter() → Filtra elementos que cumplen una condición
let pares = numeros.filter(n => n % 2 === 0); // [2,4]

// find() → Devuelve el primer elemento que cumple la condición
let mayorQue3 = numeros.find(n => n > 3); // 4

// some() / every() → Comprueban condiciones
numeros.some(n => n > 4);  // true
```

Transformar arrays
```js
// reduce() → Acumula valores
let suma = numeros.reduce((acc, n) => acc + n, 0); // 15

// concat() → Une arrays
let mas = numeros.concat([6,7]); // [1,2,3,4,5,6,7]

// join() → Convierte en string
numeros.join(" - "); // "1 - 2 - 3 - 4 - 5"

// slice() → Extrae una parte (sin modificar)
numeros.slice(1, 3); // [2,3]

// sort() → Ordena el array
numeros.sort((a,b) => a-b); // orden ascendente

// reverse() → Invierte el orden
numeros.reverse(); // [5,4,3,2,1]

// splice() → Añade o elimina en posiciones específicas
numeros.splice(2,1); // Elimina 1 elemento en índice 2 → [1,2,4,5]
```

### 07. Desestructuración de arrays

La desestructuración permite extraer valores de un array y asignarlos a variables de manera sencilla y legible.

```js
let numeros = [10, 20, 30];
let [a, b, c] = numeros;

console.log(a); // 10
console.log(b); // 20
console.log(c); // 30
```

Saltar elementos, puedes omitir posiciones dejando comas vacías
```js
let [primero, , tercero] = numeros;
console.log(primero, tercero)
```

Valores por defecto, si el array no tiene suficientes elementos, se pueden asignar valores por defecto:
```js
let [x, y, z = 100] = [1, 2];
console.log(z); // 100
```

Rest operator (...), permite agrupar el resto de los elementos en un array:
```js
let [p, q, ...resto] = [1, 2, 3, 4, 5];
console.log(resto); // [3,4,5]  
```

### 08. Recorrido de Arrays

El bucle for clásico es una de las formas más usadas para recorrer arrays.
Permite acceder a cada elemento utilizando su índice.

```js
let numeros = [10, 20, 30, 40];

for (let i = 0; i < numeros.length; i++) {
  console.log(`Índice ${i}: Valor ${numeros[i]}`);
}
```

for...of → Itera sobre valores directamente
```js
for (let num of numeros) {
  console.log(num);
}
// 10, 20, 30, 40
```

for...in → Itera sobre índices
```js
for (let i in numeros) {
  console.log(`Índice ${i} → Valor ${numeros[i]}`);
}
// Índice 0 → Valor 10 ...
```

Otos métodos modernos de arrays (forEach, map, filter...) ya vistos