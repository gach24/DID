# FRONTEND


Ahora prescidiremos del array de guitarras del frontend y consultaremos las guitarras disponibles en el backend

## COPIA Y ARRANQUE DEL PROYECTO DE FRONTEND

- Copiaremos el proyecto *guitars-ts-app* de la carpeta *05-project-02* y lo pegamos dentro de nuestra carpeta de trabajo *09-project-04* a la altura del proyecto del *backend*

- Cambiamos de nombre el proyecto de *guitars-ts-app* a *frontend-guitars-app*

- Arrancamos el proyecto con el comando:

```bash
# Es necesario estar en la carpeta del proyecto
npm run dev
```

## CONSULTA A LA API

- Nos situamos dentro del componente `App.tsx` y eliminamos cualquier referencia a fichero `db` con el array de guitarras

- Modificamos o creamos un `useState` que contendrá las guitarras. Lo inicializamos inicialmente con un array vacío (Las guitarras dejarán de verse)

```jsx
const App = () => {
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  ...

  return (
    <>
      { /* Header */ }
      ...

      { /* Main Content */ }
      ...
      {
        /* Guitars List */
        guitars.map((guitar) => (
          <Guitar guitar={guitar} addToCart={addToCart} key={guitar.id} />
        ))
      }
      ...

      { /* Footer */ }
      ...
    </>
  );
};

export default App;
```

- Añadimos un `useEffect` encargado de cargar inicialmente las guitarras y observar cualquier cambio

```jsx
...
const App = () => {

  const [guitars, setGuitars] = useState<Guitar[]>([]);

  useEffect(() => {
    // Aquí se implementa la lógica para cargar las guitarras desde una API o fuente de datos externa
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((data) => setGuitars(data))
      .catch(error => console.error('Error al cargar las guitarras:', error));

  }, [guitars]);
  
  ...

  return ( ... );
};
...
```

## MEJORAS

### URL COMO VARÍABLE DE ENTORNO

- La url a la consultamos las guitarras no debería estar puesta de menera literal en nuestro código

- Se debe externalizar a un fichero de variables de entorno de manera que podamos modicar en producción el comportamiento de nuestra aplicación sin modificar nuestro código, tan solo cambiando sus variables de entorno

- Pasos

1. Creamos un fichero .env dentro de la raíz de nuestro proyecto

2. Comprobamos en nuestro fichero `.gitignore` que el fichero está presente, ya que no debemos subirlo a nuestro repositorio de github

3. Creamos nuestra variable de entorno. ***Es obligatorio que empieze con VITE***

```env
VITE_GUITARS_API=http://localhost:3000
```

4. En nuestro código modificamos la url por la variable de entorno

```jsx
... 
useEffect(() => {
  fetch(import.meta.env.VITE_API_URL)
    .then(response => response.json())
    .then((data) => setGuitars(data))
    .catch(error => console.error('Error al cargar las guitarras:', error));
}, [guitars]);
...
```

### TIEMPO DE CARGA DE LAS GUITARRAS

- En el ejemplo no es apreciable, pero puede suceder que el tiempo de carga de las guitarras sea de unos segundos, en ese intervalo el espacio dedicado a las guitarras aparecerá en blanco. Puede ser interesane añadir un *loading* que ayude al usuario a entender que la aplicación sigue funcionando

- Para hacer esto vamos a simular que nuestra api tarda 3 segundos en responder

```jsx
...
useEffect(() => {
  setTimeout(() => {
    fetch(URL)
      .then(response => response.json())
      .then((data) => setGuitars(data))
      .catch(error => console.error('Error al cargar las guitarras:', error));
  }, 3000);
}, [guitars]);
...
```

- Para solucionar esto podemos mostrar las guitarras condicionalmente

```jsx
...
{
  guitars.length === 0 ? (
    <div>Cargando guitarras...</div>
  ) : (
    guitars.map((guitar) => (
    <Guitar guitar={guitar} addToCart={addToCart} key={guitar.id} />
    ))
  )
}
...
```

