import { createContext, type PropsWithChildren } from 'react';
import { useCart } from '../hooks/useCart';

/**
 * Interfaz que define la estructura del contexto del carrito de compras.
 * 
 * @interface CartContextProps
 */
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

/**
 * Contexto de React que proporciona acceso al estado y funciones del carrito.
 * Se crea con un objeto vacío como valor por defecto y se tipa como CartContextProps.
 * 
 * @type {React.Context<CartContextProps>}
 */
const CartContext = createContext({} as CartContextProps);

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
  
  const { cart, addToCart, delFromCart, updateQuantity, clearCart } = useCart();
  
  return <CartContext   
    value={{ cart, addToCart, delFromCart, updateQuantity, clearCart }}>
    {children}
  </CartContext>
};

export { CartProvider, CartContext };