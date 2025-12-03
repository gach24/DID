# CONTEXT

Hasta ahora nuestro frontesta dividido en diferentes componentes a los que pasamos datos y funciones mediante sus props
El objetivo de este proyecto es la modificación de esto para simplifica nuestra aplicacion mediante el uso de useContext

## useContext

El uso de useContext evita pasar props por múltiples niveles. En lugar de pasar cart y funciones desde App → Header → CartItem, defines un Context y cualquier componente hijo puede acceder a esos valores directamente.

## IMPLEMENTACIÓN

### CREACIÓN DEL CONTEXTO

- Creamos una carpeta **context** y dentro de ella un fichero **CartContext.ts**

- Dentro del mismo creamos una interface de como debería lucir nuestro contexto

```jsx
interface CartContextProps {
  /** Array de items actualmente en el carrito */
  cart: CartItem[];
  
  /** 
   * Función para agregar una guitarra al carrito.
   * @param {Guitar} guitar - La guitarra que se desea agregar al carrito
   */
  addToCart: (guitar: Guitar) => void;
  
  /** 
   * Función para eliminar un item del carrito por su ID.
   * @param {GuitarId} id - El identificador único del item a eliminar
   */
  delFromCart: (id: GuitarId) => void;
  
  /** 
   * Función para actualizar la cantidad de un item en el carrito.
   * @param {GuitarId} id - El identificador único del item a actualizar
   * @param {number} delta - El cambio en la cantidad (puede ser positivo o negativo)
   */
  updateQuantity: (id: GuitarId, delta: number) => void;
  
  /** Función para vaciar completamente el carrito, eliminando todos los items */
  clearCart: () => void;
}
```

- Creamos el contexto

```jsx
/**
 * Contexto de React que proporciona acceso al estado y funciones del carrito.
 * Se crea con un objeto vacío como valor por defecto y se tipa como CartContextProps.
 * 
 * @type {React.Context<CartContextProps>}
 */
const CartContext = createContext({} as CartContextProps);
```

- Finalmente creamos un High Order Component (Provider) que nos permita añadir el contexto en nuestra aplicación

```jsx
/**
 * Proveedor del contexto del carrito que envuelve la aplicación.
 * Utiliza el hook personalizado useCart para obtener el estado y las funciones,
 * y las proporciona a todos los componentes hijos a través del contexto.
 * 
 * @component
 * @param {PropsWithChildren} props - Las props del componente
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto
 * @returns {JSX.Element} El componente CartContext.Provider con los valores del carrito
 */
const CartProvider = ({ children }: PropsWithChildren) => {
  
  // Hook con las funciones de manuejo del carrito
  const { cart, addToCart, delFromCart, updateQuantity, clearCart } = useCart();
  
  return <CartContext   
    value={{ cart, addToCart, delFromCart, updateQuantity, clearCart }}>
    {children}
  </CartContext>
};
```

### INYECCIÓN DEL CONTEXTO DENTRO DE LA APLICACIÓN

- Dentro del **main.tsx**, envolvemos el componente principal dentro del High Order Component (provider)

```jsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
```

### UTILIZACIÓN DEL CONTEXTO

- Modificamos el **Header.tsx** para eliminar sus props y sacamos lo que necesitamos del contexto

```jsx
  /**
   * Destructuración de las propiedades del carrito
   * para acceso más sencillo en el componente
   */
  const { cart, delFromCart, updateQuantity, clearCart } = useContext(CartContext);
```

- Hacemos lo mismo con el **Guitar.tsx**

```jsx
  /**
   * Destructuración de las propiedades del carrito
   * para acceso más sencillo en el componente
   */
  const { addToCart } = useContext(CartContext);
```

