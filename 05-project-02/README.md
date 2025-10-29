# Migración a Typescript del proyecto GuitarsApp

## ¿Que es typescript?
TypeScript es un lenguaje de programación de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto tipado de JavaScript, lo que significa que cualquier código JavaScript válido también es código TypeScript válido

La principal característica de Typescript es que agrega un sistema de tipos estático a JavaScript, lo que permite detectar errores y proporcionar herramientas de desarrollo más sólidas

## Ventajas de añadir TypeScript
El sistema de tipos de TypeScript permite al programador especificar tipos de variables, parámetros de función, valores de retorno y más. Esto brinda la capacidad de realizar comprobaciones de tipos durante la compilación y detectar posibles errores antes de que el código se ejecute

## TypeScript y JavaScript/React
- Una vez que has escrito el código en Typescript este siempre se compila a JavaScript.
- React y Vite incluyen soporte a TypeScript lo que ayuda bastante en el desarrollo de proyectos, y una vez listo podemos construir el proyecto, se compila y se puede acceder a él
- Hoy en día TypeScript se ha comvertido en un estándar para crear aplicaciones React, Angular o Vue.js

## En este proyecto crearemos el proyecto anterior GuitarsApp en TypeScript

```bash
npm create vite@latest
```

- La estructura es básicamente la misma que en el proyecto con JavaScript
- Salvo:
    - Dos archivos nuevos `tsconfig.json` y `tsconfig.node.js`
    - Los archivos `.jsx` pasan a tener extensión  `.tsx`
