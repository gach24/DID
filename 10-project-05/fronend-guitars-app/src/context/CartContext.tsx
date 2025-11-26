import { createContext, type PropsWithChildren } from 'react';
import { useCart } from '../hooks/useCart';

interface CartContextProps {
  cart: CartItem[];
  addToCart: (guitar: Guitar) => void;
  delFromCart: (id: GuitarId) => void;
  updateQuantity: (id: GuitarId, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext({} as CartContextProps);

const CartProvider = ({ children }: PropsWithChildren) => {
  
  const { cart, addToCart, delFromCart, updateQuantity, clearCart } = useCart();
  
  return <CartContext 
    value={{ cart, addToCart, delFromCart, updateQuantity, clearCart }}>
    {children}
  </CartContext>
};

export { CartProvider, CartContext };