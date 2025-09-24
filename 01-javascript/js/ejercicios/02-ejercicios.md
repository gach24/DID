# EJERCICIOS

## Arrays y métodos básicos
1. Declara un array con al menos 5 nombres de personas.
    - Añade un nombre al final.
    - Elimina el primero.
    - Busca si existe un nombre concreto con includes().
2. Declara un array con al menos 5 nombres de personas.
    - Añade un nombre al final.
    - Elimina el primero.
    - Busca si existe un nombre concreto con includes().
3. Ordena el array [4, 1, 9, 3, 7] de forma ascendente y descendente.

## Desestructuración de arrays
1. Dado el array ["manzana", "pera", "plátano", "naranja"]:
    - Extrae en variables fruta1 y fruta2 los dos primeros.
    - Usa el operador rest para guardar el resto en un nuevo array.
2. Intercambia los valores de dos variables usando desestructuración
```js
let a = 100;
let b = 200;
```
3. Extrae el color azul del array anidado:
```js
let colores = ["rojo", ["verde", "azul", "amarillo"]];
```


## Recorrido de arrays con for

1. Crea un array con los números del 1 al 5 y muéstralos en consola con:
    - Un for clásico.
    - Un for...of.
    - Un for...in.
2. Recorre el array ["HTML", "CSS", "JavaScript", "React"] con un for clásico e imprime "Posición X: Valor Y"
3. Recorre un array al revés (for con decremento).

## Recorridos con forEach, filter y map

1. Dado el array ["Ana", "Luis", "Marta", "Pedro"], recórrelo con forEach e imprime un saludo para cada nombre.
2. Crea un array de números [2, 4, 6, 8] y usa forEach para mostrar el doble de cada número.
3. Dado el array [5, 12, 8, 130, 44], usa filter para obtener solo los números mayores que 10.
4. Crea un array con nombres ["Ana", "Alberto", "Bea", "Carlos"] y filtra los que empiecen por la letra A.
5. Dado un array de edades [15, 18, 21, 12, 30], usa filter para obtener solo las que representen mayores de edad (≥18).
6. Dado el array [1, 2, 3, 4, 5], usa map para obtener un nuevo array con los números elevados al cuadrado
7. Crea un array con precios [10, 20, 30] y usa map para calcular el precio con IVA (21%) incluido
8. Dado el array ["html", "css", "javascript"], usa map para poner en mayúsculas cada palabra.
9. Dado el array [3, 8, 12, 5, 7, 20]:
    - Usa filter para quedarte con los pares.
    - Luego, usa map para multiplicarlos por 10
10. Dado el array de objetos:
```js
let alumnos = [
  { nombre: "Ana", nota: 7 },
  { nombre: "Luis", nota: 4 },
  { nombre: "Marta", nota: 9 }
];
```
- Filtra solo los alumnos con nota ≥ 5.
- Usa map para obtener un array solo con sus nombres.
-   Recorre el resultado con forEach e imprime: "Alumno aprobado: NOMBRE"