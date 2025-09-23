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

### 06 Function Expression

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
```js

```
```js

```
```js

```
```js

```
```js

```