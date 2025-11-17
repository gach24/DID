# BACKEND

## INICIO

Comenzaremos con la generación del proyecto de backend, para hacer esto nos apoyaremos en [Nestjs](https://nestjs.com/)

### ¿Qué es NestJS?

NestJS es un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes, confiables y escalables. Está construido con TypeScript y combina elementos de la Programación Orientada a Objetos (OOP), Programación Funcional (FP) y Programación Reactiva Funcional (FRP).

#### Características principales:

- **Arquitectura modular**: Organiza el código en módulos reutilizables
- **TypeScript**: Soporta TypeScript de forma nativa
- **Decoradores**: Utiliza decoradores para definir rutas, controladores y servicios
- **Inyección de dependencias**: Sistema robusto de DI inspirado en Angular
- **Soporte para múltiples plataformas**: Express o Fastify como servidor HTTP
- **CLI potente**: Herramienta de línea de comandos para generar código automáticamente

## CREACIÓN DEL PROYECTO DE BACKEND

Para la creación del proyecto nestjs nos apoyaremos en su [página de documentación](https://docs.nestjs.com/first-steps)

### PASOS

1. Situarnos en la carpeta *09-proyect*
2. Creación y arranque del proyecto.

```bash
# nest new project-name
nest new backend-guitars-app
cd backend-guitars-app
npm run start:dev
```

3. Copiar las guitarras
  - Copiamos la carpeta *data* del proyecto *guitars-ts-app* y la pegamos en la carpeta *src* de nuestro proyecto
  - Copiamos también el fichero de tipos *types.d.ts*

4. Modificamos el controlador y el servicio, *app.controller.ts* y *app.service.ts*

```ts
// app.service.ts
@Injectable()
export class AppService {
  getGuitars(): Guitar[] {
    return db;
  }
}
```

```ts
// app.controller.ts
@Controller()
export class AppController {
  ...
  @Get()
  getGuitars(): Guitar[] {
    return this.appService.getGuitars();
  }
}
```

5. Comprobamos en *postman* la petición **GET** contra la url *http://localhost:3000*

6. Habilitamos los cors para permitir peticiones desde otra aplicación. Dentro del fichero `main.ts` añadimos la siguiente línea

```ts
...
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitación de cors
  await app.listen(process.env.PORT ?? 3000);
}
...
```


## MODIFICACIÓN DEL PROYECTO DE FRONTEND

Ahora prescidiremos del array de guitarras del frontend y consultaremos las guitarras disponibles en el backend

### COPIA Y ARRANQUE DEL PROYECTO DE FRONTEND

- Copiaremos el proyecto *guitars-ts-app* de la carpeta *05-project-02* y lo pegamos dentro de nuestra carpeta de trabajo *09-project-04* a la altura del proyecto del *backend*

- Cambiamos de nombre el proyecto de *guitars-ts-app* a *frontend-guitars-app*

- Arrancamos el proyecto con el comando:

```bash
# Es necesario estar en la carpeta del proyecto
npm run dev
```

### CONSULTA A LA API

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

### MEJORAS

#### URL COMO VARÍABLE DE ENTORNO

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

#### TIEMPO DE CARGA DE LAS GUITARRAS

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

