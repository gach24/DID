import { useEffect, useState } from 'react';

/**
 * Cantidad máxima de guitarras que se pueden agregar al carrito por producto
 * @constant {number}
 */
const MAX_COUNT_GUITARS = 10;

/**
 * Datos iniciales del carrito recuperados desde localStorage
 * Si no hay datos previos, se inicializa como un array vacío
 * @constant {Array}
 */
const initialData = JSON.parse(localStorage.getItem('cart')) ?? [];

/**
 * Hook personalizado para gestionar el carrito de compras
 * Maneja las operaciones de agregar, eliminar, actualizar cantidad y limpiar el carrito
 * Persiste los datos en localStorage automáticamente
 * 
 * @returns {Object} Objeto con el estado del carrito y las funciones para manipularlo
 * @returns {Array} cart - Array de productos en el carrito
 * @returns {Function} addToCart - Función para agregar un producto al carrito
 * @returns {Function} delFromCart - Función para eliminar un producto del carrito
 * @returns {Function} updateQuantity - Función para actualizar la cantidad de un producto
 * @returns {Function} clearCart - Función para vaciar el carrito
 */
export const useCart = () => {

  /**
   * Estado del carrito de compras
   * @type {[Array, Function]}
   */
  const [cart, setCart] = useState(initialData);

  /**
   * Efecto para sincronizar el carrito con localStorage
   * Se ejecuta cada vez que el carrito cambia
   */
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart]);

  /**
   * Agrega una guitarra al carrito
   * Si la guitarra ya existe, incrementa su cantidad (máximo MAX_COUNT_GUITARS)
   * Si no existe, la agrega con cantidad 1
   * 
   * @param {Object} guitar - Objeto con la información de la guitarra a agregar
   * @param {number} guitar.id - ID único de la guitarra
   */
  const addToCart = (guitar) => {
    cart.some((item) => item.id === guitar.id) ?       
      setCart(
          cart.map((item) =>
            item.id === guitar.id && item.quantity < MAX_COUNT_GUITARS
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        ) 
      : 
      setCart([...cart, { ...guitar, quantity: 1 }]);
  };

  /**
   * Elimina una guitarra del carrito por su ID
   * 
   * @param {number} id - ID de la guitarra a eliminar
   */
  const delFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  }

  /**
   * Actualiza la cantidad de una guitarra en el carrito
   * La cantidad debe estar entre 1 y MAX_COUNT_GUITARS
   * 
   * @param {number} id - ID de la guitarra a actualizar
   * @param {number} delta - Cantidad a incrementar (positivo) o decrementar (negativo)
   */
  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity + delta >= 1 && item.quantity + delta <= MAX_COUNT_GUITARS
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
    save();
  };

  /**
   * Vacía completamente el carrito de compras
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
