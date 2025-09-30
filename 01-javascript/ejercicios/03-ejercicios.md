# 📝 Ejercicios de Módulos en JavaScript

### 1. Exportar e importar constantes
Crea un archivo `constantes.js` que contenga varias constantes como el nombre de la app, la versión y el autor.  
Importa esas constantes en `app.js` y muéstralas en consola.  

---

### 2. Funciones matemáticas
En `operaciones.js` crea y exporta funciones para sumar, restar, multiplicar y dividir.  
En `main.js` importa esas funciones y prueba varias operaciones.  

---

### 3. Exportación por defecto  
Crea un archivo `saludos.js` que tenga una exportación por defecto con una función `saludar(nombre)`.  
Importa esa función en `index.js` y úsala con tu nombre.  

---

### 4. Combinar exportaciones  
En `utils.js` exporta:
- Una constante llamada `APP_NAME`.  
- Una función `mayusculas(texto)` que convierta un string a mayúsculas.  
Haz una exportación por defecto con una función que reciba un array de strings y devuelva el primero.  
En `app.js` importa todo y pruébalo.  

---

### 5. Importar con alias  
En `matematicas.js` exporta dos funciones: `areaCirculo(radio)` y `areaCuadrado(lado)`.  
En `main.js` importa esas funciones con alias (`circulo`, `cuadrado`) y calcula las áreas de un círculo de radio 5 y un cuadrado de lado 4.  

---

### 6. Importar todo con `* as`
En `personas.js` exporta varias constantes con nombres de personas.  
En `main.js` impórtalas todas bajo un objeto:  

```js
import * as nombres from "./personas.js";
