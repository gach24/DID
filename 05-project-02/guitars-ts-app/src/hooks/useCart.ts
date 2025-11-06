import { useEffect, useState } from 'react';


/**
 * Máximo número de unidades permitidas por cada guitarra en el carrito.
 *
 * Se intenta leer desde la variable de entorno VITE_MAX_CART_ITEMS y si no existe
 * se usa 15 como valor por defecto.
 * @type {number}
 */
const MAX_COUNT_GUITARS =  Number(import.meta.env.VITE_MAX_CART_ITEMS) || 15;


/**
 * Estado inicial del carrito cargado desde localStorage.
 * La clave usada es `cart`. Si no existe, se utiliza un array vacío.
 * @type {CartItem[]}
 */
const initialData: CartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');


/**
 * useCart
 *
 * Hook de React que gestiona un carrito de compra sincronizado con localStorage.
 *
 * Devuelve un objeto con el estado actual del carrito y funciones para modificarlo.
 *
 * @returns {{
 *   cart: CartItem[],
 *   addToCart: (guitar: Guitar) => void,
 *   delFromCart: (id: GuitarId) => void,
 *   updateQuantity: (id: GuitarId, delta: number) => void,
 *   clearCart: () => void
 * }} Objeto con el estado y acciones del carrito.
 *
 * @example
 * const { cart, addToCart, updateQuantity, delFromCart, clearCart } = useCart();
 * addToCart(guitar); // añade o incrementa cantidad
 */
export const useCart = () => {

  const [cart, setCart] = useState<CartItem[]>(initialData);


  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart]);


  /**
   * Añade una guitarra al carrito o incrementa su cantidad en 1 si ya existe.
   * La cantidad resultante se clampa por MAX_COUNT_GUITARS.
   *
   * @param {Guitar} guitar - Objeto guitarra que se añadirá al carrito.
   * @returns {void}
   * @example
   * addToCart({ id: '1', name: 'Strat', price: 1000 });
   */
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


  /**
   * Elimina completamente un item del carrito por su id.
   *
   * @param {GuitarId} id - Identificador de la guitarra a eliminar.
   * @returns {void}
   * @example
   * delFromCart(1); // elimina la guitarra con id 1
   */
  const delFromCart = (id: GuitarId) => {
    setCart(cart.filter((item) => item.id !== id));
  }


  /**
   * Actualiza la cantidad de una guitarra aplicando un delta (positivo o negativo).
   * Si la nueva cantidad estaría fuera del rango [1, MAX_COUNT_GUITARS], la actualización
   * para ese item se ignora y no se produce ningún cambio.
   *
   * @param {GuitarId} id - Identificador de la guitarra a actualizar.
   * @param {number} delta - Cambio entero a aplicar a la cantidad (p. ej. -1 o +1).
   * @returns {void}
   * @example
   * updateQuantity('1', -1); // decrementa, pero no baja de 1
   */
  const updateQuantity = (id: GuitarId, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity + delta >= 1 && item.quantity + delta <= MAX_COUNT_GUITARS
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };


  /**
   * Vacía completamente el carrito.
   * @returns {void}
   * @example
   * clearCart();
   */
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
