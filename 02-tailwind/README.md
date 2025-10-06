
# 🌈 Apuntes de Tailwind CSS

## 🧩 ¿Qué es Tailwind CSS?
Tailwind CSS es un framework **CSS utilitario** que permite crear interfaces de usuario rápidamente mediante **clases predefinidas**, sin necesidad de escribir CSS personalizado.

---

## ⚙️ Instalación mediante CLI

### 1. Crear proyecto
```bash
mkdir mi-proyecto-tailwind
cd mi-proyecto-tailwind
npm init -y
```

### 2. Instalar Tailwind y dependencias
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configurar rutas de contenido en `tailwind.config.js`
```js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Importar Tailwind en tu CSS principal (por ejemplo `src/index.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Ejecutar el servidor de desarrollo
```bash
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

Y enlaza `output.css` en tu HTML.

---

## 🧱 Clases básicas de Tailwind

### 🎨 Colores y fondo
```html
<div class="bg-blue-500 text-white p-4">Hola Tailwind</div>
```
- `bg-blue-500` → fondo azul  
- `text-white` → texto blanco  
- `p-4` → padding interno de 1rem

### 📏 Espaciado
```html
<div class="m-2 p-4">Espaciado</div>
```
- `m-2` → margen  
- `p-4` → padding

### 🔤 Tipografía
```html
<h1 class="text-3xl font-bold text-center">Título</h1>
```
- `text-3xl` → tamaño de fuente  
- `font-bold` → negrita  
- `text-center` → centrado

### 🧍 Bordes y sombras
```html
<div class="border border-gray-300 rounded-lg shadow-md p-4">
  Tarjeta con borde y sombra
</div>
```

---

## 🧭 Layout con Flexbox

### Activar Flex
```html
<div class="flex">
  <div class="p-4 bg-blue-300">1</div>
  <div class="p-4 bg-blue-400">2</div>
  <div class="p-4 bg-blue-500">3</div>
</div>
```

### Dirección y alineación
```html
<div class="flex flex-col items-center justify-center h-64 bg-gray-100">
  <div class="p-2 bg-green-300">A</div>
  <div class="p-2 bg-green-400">B</div>
</div>
```
- `flex-col` → dirección columna  
- `items-center` → alinea horizontalmente  
- `justify-center` → alinea verticalmente  

### Espaciado entre elementos
```html
<div class="flex gap-4">
  <div class="bg-pink-300 p-4">1</div>
  <div class="bg-pink-400 p-4">2</div>
</div>
```

### Creación de layouts responsivos
```html
<div class="flex flex-col md:flex-row">
  <div class="flex-1 bg-indigo-300 p-4">Izquierda</div>
  <div class="flex-1 bg-indigo-400 p-4">Derecha</div>
</div>
```
- En pantallas medianas (`md:`) cambia a disposición horizontal.

---

## 🧮 Layout con Grid

### Grid básico
```html
<div class="grid grid-cols-3 gap-4">
  <div class="bg-yellow-300 p-4">1</div>
  <div class="bg-yellow-400 p-4">2</div>
  <div class="bg-yellow-500 p-4">3</div>
</div>
```
- `grid-cols-3` → 3 columnas  
- `gap-4` → espacio entre celdas  

### Ancho variable
```html
<div class="grid grid-cols-3 gap-2">
  <div class="col-span-2 bg-teal-300 p-4">Columna 1 (x2)</div>
  <div class="bg-teal-400 p-4">Columna 2</div>
</div>
```

### Grid responsivo
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-purple-300 p-4">1</div>
  <div class="bg-purple-400 p-4">2</div>
  <div class="bg-purple-500 p-4">3</div>
  <div class="bg-purple-600 p-4">4</div>
</div>
```

### Centrado en Grid
```html
<div class="grid place-items-center h-64 bg-gray-200">
  <div class="bg-white p-4 shadow">Centrado</div>
</div>
```

---

## 🧰 Combinar Flex y Grid

```html
<div class="grid grid-cols-2 gap-4">
  <div class="flex flex-col justify-between bg-sky-300 p-4">
    <h2 class="text-lg font-semibold">Título</h2>
    <button class="bg-white text-sky-600 px-3 py-1 rounded">Acción</button>
  </div>
  <div class="bg-sky-400 p-4">Contenido</div>
</div>
```

---

## 🧾 Recursos útiles

- 📘 [Documentación oficial](https://tailwindcss.com/docs)
- 🎨 [Tailwind Playground](https://play.tailwindcss.com)
- 🧑‍💻 [Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
