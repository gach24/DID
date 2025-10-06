# PASOS

1. Instalar [Nodejs](https://nodejs.org/es)  
2. Crear la carpeta del proyecto
3. Inicializar el proyecto de nodo
```sh
npm init -y
```
4. Instalar Tailwind CSS
```sh
npm install tailwindcss @tailwindcss/cli
```
3. Añadir el fichero de importación de tailwind `./css/tailwind.css`
```css
@import "tailwindcss";
```
4. Crear el index.html con los estilos necesarios

5. Compilar el codigo tailwind
```sh
npx @tailwindcss/cli -i ./css/tailwind.css -o ./css/output.css --watch
```

6. Enlazar el fichero `output.css` con el `index.hmtl`