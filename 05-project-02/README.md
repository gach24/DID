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

## Typescript: Types & Intefaces
- Son dos de las características que más vas a utilizar en Typescript (Types e Interfaces)
- Ambas pueden ser utilizadas incluso de forma intercambiable, hay muy pocas diferencias entre ambos y en la comunidad vas a encontrar ejemplos de ambos
- Es una forma de crear un estructura o agrupar propiedades de un objeto

## En este proyecto crearemos el proyecto anterior GuitarsApp en TypeScript

### Creación del proyecto typescript

```bash
npm create vite@latest
```

- La estructura es básicamente la misma que en el proyecto con JavaScript
- Salvo:
    - Dos archivos nuevos `tsconfig.json`, `tsconfig.app.json` y `tsconfig.node.json`. En lo que a nosotros nos afecta es la configuración del `tsconfig.app.json` la más importante ya que es la que afecta a la compilación de los ficheros `.ts` que se ejecutarán en el navegador 
    - Los archivos `.jsx` pasan a tener extensión  `.tsx`

### Movimiento de archivos

- La carpeta `/public/img` del proyecto javascript la movemos al proyecto typescript (podemos borrar el fichero `vite.svg`)
- Eliminamos la carpeta `/src` del proyecto typescript y la sustituimos por la carpeta `/src` del proyecto javascript
- Renombramos el la carpeta que acabamos de copiar todos los archvivos `*.js` a `*.ts` y `*.jsx` a `*.tsx`

Se muestran multiples errores (que no son errores) que vamos a solucionar

### Solución de errores

- Archivo `main.tsx`:

```tsx
// Aseguramos que el elemento devuelto no es nulo
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- Archivo `/src/data/db.ts`:

```ts
// Tipo de guitarra
export interface Guitar {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};      

// Array de guitarras
export const db: Guitar[] = [
  {
      id: 1,
      name: 'Lukather',
      image: 'guitarra_01',
      description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
      price: 299,
  },
  ...
]
```

- Archivo `/src/components/Guitar.tsx`:
  - Creamos un nuevo archivo `types.d.ts` dentro de `/src` para almacenar los archivos con nuestros tipos
```ts
// Recuerda quitar el tipo del archivo db.ts
interface Guitar {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};      
```
  - Ahora añadimos un tipo a las props
```tsx

type GuitarProps = {
  guitar: Guitar;
  addToCart: (guitar: Guitar) => void;
};


export const Guitar = ({ guitar, addToCart }: GuitarProps) => {
    ...
    const handleClick = (guitar: Guitar) => {
        addToCart(guitar);
    };
    ...
}
```

- Archivo `useCart`: 

Lo primero creamos dos nuevos tipos para las guitarras que añadimos al carrito

```ts
// types.d.ts
...

interface CartItem extends Guitar {
  quantity: number;
}

type GuitarId = Lookup<Guitar, 'id'>;
```

Modificamos el `useCart`

```ts
...

const initialData: CartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

export const useCart = () => {

  const [cart, setCart] = useState<CartItem[]>(initialData);


  useEffect(
    () => { localStorage.setItem('cart', JSON.stringify(cart)) }, 
    [cart]
  );


  const addToCart = (guitar: Guitar) => {
    if (cart.some((item) => item.id === guitar.id)) {
      setCart(
        cart.map((item) =>
          item.id === guitar.id && item.quantity < MAX_COUNT_GUITARS
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...guitar, quantity: 1 }]);
    }
  };

  const delFromCart = (id: GuitarId) => { ... }

  const updateQuantity = (id: GuitarId, delta: number) => { ... };

  const clearCart = () => { ... }
  
  return {
    ...
  }
}

```

- Archivo `/src/components/Header.tsx`:

```tsx

interface HeaderProps {
  cart: CartItem[];
  delFromCart: (id: GuitarId) => void;
  updateQuantity: (id: GuitarId, delta: number) => void;
  clearCart: () => void;
}

export const Header = ({cart, delFromCart, updateQuantity, clearCart} : HeaderProps) => {
    ...
}
```

### Tarea
- Realiza el resto de cambios