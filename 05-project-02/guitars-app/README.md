# GUITARS APP

## COMPONENTES

- Un componente en react es básicamente html y js en un solo archivo
- React utiliza componentes para la creación de sitios web
- App.jsx es un componente pero demasiado grande
- Normalmente dividiremos los componentes grandes en pequeños componentes reutilizables si es posible

**_Creación del primer componente_**

- Creamos el componente `Header`

## REGLAS DEL JSX

- A diferencia del HTML, que no es estricto, en JSX si un elemento HTML tiene una etiqueta de apertura deberá tener su etiquieta de cierre
- Cada component debe tener un `return` y solo puede devolver un elemento (este elemento puede contener otros elementos)
- No se permite la palabra reservada **class**

**_Eliminación de errores_**

- Sustituimos la palabra **class** por **className**
- Buscamos en todo el proyecto `/public/img/...` y quitamos `/public`

**_Creación del componente para la guitarra_**

- Creamos el componente en la carpeta de `components`
- Copiamos el código html de una de las guitarras en el componente
- Utilizamos el componente y eliminamos el resto de guitarras

## QUE ES EL STATE

El estado es una variable con información relevante en nuestra aplicación de React, algunas veces el state forma parte de un componente en específico o algunas veces deseas compartirlo a lo largo de diferentes componentes

Cada vez que tu _state_ cambia, tu aplicación de React va a renderizar y actualizarse con los cambios, no es necesario nada más y tu interfaz siempre estará sincronizada con el _state_

**_Hook: useState_**

```jsx
import { useState } from 'react'

...

const [customer, setCustomer] = useState({});
const [total, setTotal] = useState(0);
const [products, setProducts] = useState([]);
const [modal, setModal] = useState(false);
```

**\_Utilización del useState en el proyecto**

- En el `App.jsx` importamos el hook `useState`
- Utilizamos el `useState` en nuestra función del `jsx`

```jsx
import { useState } from 'react';

...

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <>
        ...
    </>
  );
};

export default App;
```

- Vemos los components y hooks en la herramienta React Devoloper Tools

## HOOKS

**_Reglas de los hooks_**

- Los hooks se colocan en la parte superior de tus componentes de React.
- No se deben colocar dentro de condicionales

**_Hook: useEffect_**

- Después del de `useState` es el más común
- Siempre tienen un `callback`
- Use effect se ejecuta automáticamente cuando el componentes está listo, es un buen lugar para colocar código de consulta a alguna API o al LocalStorage
- Debido a que le podemos pasar una dependencia y estar escuchando por los cambios que sucendan en una variable, puede actualizar el componente cuando el cambio suceda

```jsx
import { useEffect } from 'react';

...

useEffect(() => {
  console.log('Componente listo');
}, []);
```

**\_Utilización del useEffect en el proyecto**

- Añadimos al proyecto el archivo db del material de inicio
- En el archivo `App.jsx` importamos el fichero y lo mostramos mediante un `console.log(...)`
- Utilizamos un `useState` para almacenar las guitarras
- Utilizamos un `useEffect` para añadir las guitarras al estado

```jsx
import { useState, useEffect } from 'react';
import { db } from './data/db';
...

const App = () => {
  const [guitars, setGuitars] = useState([]); // Inicializacíón vacía
  useEffect(() => {
    console.log(`Cargando datos de guitarras...${guitars.length}`);
    setGuitars(db);
  }, [guitars]); // Cargamos las guitarras cuando el componente esté listo

  return <>...</>;
};

export default App;
```

## ITERACIONES.

- Vamos a mostrar las guitarras
- Para mostrar todos las guitarras vamos a utilizar un map

```jsx
import { useState, useEffect } from 'react';
...

const App = () => {
  ...

  return (
    <>
      ...
      <main className="container-xl mt-5">
        ...

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} />
          ))}
        </div>
      </main>

      ...
    </>
  );
};

export default App;
```

- **Nota**: Como se puede observar se muestrán la misma guitarra 13 veces

## PROPS

- Los props es una forma de compartir información entre componentes
- Puedes pasar información desde el componente padre hacia el hijo por medio de props
- Los Props son muy similiares a los atributos en html, pero puedes pasar arreglos, objetos o también funciones
- Si tienes un state que se va a pasar por diferentes componentes, lo mejor es colocarlo en el archivo principal
- Cada nivel de componentes deberá tomar y pasar el Prop hacia otros componentes
- Tecnologías como Redux, Zustand, Jotai o Context evitan tener que hacerlo de esta forma

**_Implementando Props en nuestro proyecto_**

- En el componente `<Guitar >` debemos recibir como parámetro los props

```jsx
export const Guitar = (props) => {
  console.log(props)
  return (
    ...
  );
};
```

- En el `App.jsx` le enviamos los props como atributo

```jsx

...
        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} />
          ))}
        </div>
 ...
```

- Ahora en el componente `<Guitar ...>` puedo sustituir los valores

```jsx
export const Guitar = ({ guitar }) => {
  const { name, image, description, price } = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img className="img-fluid" src={`/img/${image}.jpg`} alt={name} />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button type="button" className="btn btn-dark w-100">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
```

## EVENTOS

- La forma en la que React manaja los eventos es muy similar a como lo hace JavaScript de forma nativa con algunos cambios
- Los eventos son **camelCase**, es decir en lugar de _onchange_ se utiliza _onChange_, en lugar de _onclick_ se utiliza _onClick_
- También a diferencia de JS y HTML, donde se coloca el nombre de la función en un string en React (JSX) se utiliza la función entre llaves
  `{}`

En html:

```html
<button onclick="getLatestOrders()">Descargar pedidos</button>
```

En jsx:

```jsx
<button onClick={() => getLatestOrders()}>Descargar pedidos</button>
```

**\_Implementando el primer evento en nuestro proyecto**

- Registramos el evento `onClick` dentro del botón nuestro componente `Guitar.jsx`

```jsx
export const Guitar = ({ guitar }) => {
  ...

  const handleClick = () => {
    console.log('Cliked ...');
  };

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        ...
        <button type="button" className="btn btn-dark w-100" onClick={handleClick}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
```

- Comprobación en la consola
- Añadimos el identificador de la guitarra al evento

```jsx
export const Guitar = ({ guitar }) => {
  const { id, name, image, description, price } = guitar;

  const handleClick = (id) => {
    console.log(`Cliked en la guitarra con id: ${id}`);
  };

  return (
    ...
        <button
          type="button"
          className="btn btn-dark w-100"
          // onClick={handleClick(id)} NO FUNCIONA
          onClick={() => handleClick(id)}
        >
          Agregar al Carrito
        </button>
    ...
  );
};
```

- Creamos un **state** del carrito dentro del `App.jsx`

```jsx

// App.jsx
const App = () => {
  ...
  const [cart, setCart] = useState([]);
  ...
  const addToCart = (guitar) => {
    setCart([...cart, guitar]);
  };

  return (
    <>
      ...
      <main className="container-xl mt-5">
        ...
        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} setCart={addToCart} />
          ))}
        </div>
      </main>

      ...
    </>
  );
};


// Guitar.jsx

export const Guitar = ({ guitar, addToCart }) => {
  ...

  const handleClick = (guitar) => {
    addToCart(guitar);
  };

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        ...
        <button type="button" className="btn btn-dark w-100" onClick={() => handleClick(guitar)}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
```

- Si lo hacemos de esta manera podremos introducir una validación u otro código auxiliar

```jsx
export const App = () => {
  ...

  const addToCart = (guitar) => {
    cart.findIndex(item => item.id === guitar.id) === -1 
      && setCart([...cart, guitar]);
  };

  return (
    ...
  );
};
```

- Si lo que queremos es actualizar el carrito, deberíamos hacer algo como esto

```jsx
export const App = () => {
  ...

  const addToCart = (guitar) => {
    cart.some((item) => item.id === guitar.id) ?       
      setCart(
          cart.map((item) =>
            item.id === guitar.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        ) 
      : 
      setCart([...cart, { ...guitar, quantity: 1 }]);
  };

  return (
    ...
  );
};
```

## TAREA
1. Mostar el contenido del carrito


## Calculo del total del carrito
- Para el cálculo del total vamos a utilizar una función que devuelva el total del precio unitario por la cantidad de cada uno de los elementos del carrito.

- Se puede hacer de muchas maneras pero la función `reduce()` se ajusta bastante bien a este caso

- Realizamos la modificación dentro del componente `header.jsx`

```jsx
export const Header = ({cart}) => {

  const getTotal = () => {
    return cart.reduce((total, {price, quantity}) => total + (price * quantity), 0);
  }

  return (
      ...
      <p className="text-end">
        Total pagar: <span className="fw-bold">${getTotal()}</span>
      </p>
      ...
  );
};

```

## Tarea borrar un elemento del carrito

## Tarea aumentar o disminuir en 1 la cantidad de un elemento del carrito

## Tarea borrar el carrito


## Como añadir presistencia
- En este punto vamos a añadir persistencia sin tener que recurrir a bases de datos o a cookies, lo que vamos ha hacer es utilizar el **localStorage** para almacener datos dentro del navegador
- Esta es una herramienta que se utiliza para que las aplicaciones puedan interactuar con información persistente en el cliente.
- En el contexto del desarrollo de aplicaciones, el almacenamiento local permite que un componente recuerde información entre sesiones
Funcionamiento y Uso de localStorage
  1. Almacenamiento de Datos: Para almacenar un valor en el almacenamiento local, se utiliza la función **localStorage.setItem()**, acompañada de un identificador (clave) y el valor a guardar.
  2. Recuperación de Datos: Para recuperar un valor almacenado, se utiliza la función **localStorage.getItem()**, pasando la clave correspondiente

- Lo lógico en nuestro ejercicio sería crear una función que nos almacene en el **localStorage**
y llamarla siempre que modifiquemos el state. Pero esto no funciona del todo bien ya que el stage es asíncrono

- La solución más correcta es hacerlo mediante un `useEffect`

```jsx
...
const initialData = JSON.parse(localStorage.getItem('cart')) ?? [];

const App = () => {
  ...
  const [cart, setCart] = useState(initialData);
  ...
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  ...
  return (...);
};
```

## Hooks

### Crear tus propios hooks
- Existe una gran ventaja de crear tus propios **Hooks** y es la de incorporar **State** y otros **Hooks de React** a tu propio código poderlo reutilizar en otros proyectos
- Otra gran ventaja es la de organizar tu código, de esta forma el hook se encarga de toda la lógica del state mientras que tus componentes solo de mostrar la información
- Tu código personalizado tendrá todas las ventajas de React como son: state, effects, integrar otros hooks, y el preformance, reutilizable con otros proyectos, fácil de testear

### Como vamos a crear nuestros propios hooks
Los hooks son funciones de JavaScript pero tienen algunas reglas:
- Los hooks deben seguir la convención de react `use{hook}` de esta forma **React** escanea tu código en busca de posibles problemas con las reglas de los **hooks**

## Creación del hook ``useCart`

- Creamos una carpeta `hooks` dentro de la raiz de nuestro proyecto, y dentro de ella un ficheor llamado `useCart.js`
- El fichero deberá tener extensión .js porque contendrá lógica JavaScript, no un componente de React
- Creamos el **hook** como lo que es, una función de JavaScript, que en la mayoría de los casos devuelve un objeto (aunque no es obligatorio y puede devolver cualquier cosa)

```js
export const useCart = () => {
    
  return {

  }
}
```

- Para su importación se hace como cualquier módulo en JavaScript `import { useCart } from './hooks/useCart'`

```js
import { useEffect, useState } from 'react';

const MAX_COUNT_GUITARS = 10;

const initialData = JSON.parse(localStorage.getItem('cart')) ?? [];

export const useCart = () => {

  const [cart, setCart] = useState(initialData);

  useEffect( ... );

  const addToCart = (guitar) => { ... };

  const delFromCart = (id) => { ... }

  const updateQuantity = (id, delta) => { ... };

  const clearCart = () => { ... }
  
  return {
    cart,
    addToCart,
    delFromCart,
    updateQuantity,
    clearCart
  }
}
```

- Para importar lo que necesitamos en el App.jsx, unicamente desestructuramos lo que necesitamos

```jsx
...
import { useCart } from './hooks/useCart';
import { db } from './data/db';

const App = () => {
  const [guitars] = useState(db);
  const { cart, addToCart, delFromCart, updateQuantity, clearCart } = useCart();

  return ( ... );
};

...
```
