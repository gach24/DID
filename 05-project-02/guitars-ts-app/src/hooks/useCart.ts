import { useEffect, useState } from 'react';


const MAX_COUNT_GUITARS = 10;

const initialData: CartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

export const useCart = () => {

  const [cart, setCart] = useState<CartItem[]>(initialData);


  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart]);


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

  const delFromCart = (id: GuitarId) => {
    setCart(cart.filter((item) => item.id !== id));
  }


  const updateQuantity = (id: GuitarId, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity + delta >= 1 && item.quantity + delta <= MAX_COUNT_GUITARS
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  }
  
  return {
    cart,
    addToCart,
    delFromCart,
    updateQuantity,
    clearCart
  }
}
