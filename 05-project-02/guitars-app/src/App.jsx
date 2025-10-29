import { useState } from 'react';

import { Guitar, Header, Footer } from './components/';

import { useCart } from './hooks/useCart';
import { db } from './data/db';

/**
 * Componente principal de la aplicación de guitarras
 * Gestiona el estado de las guitarras disponibles y el carrito de compras
 * 
 * @component
 * @returns {JSX.Element} Aplicación completa con header, lista de guitarras y footer
 */
const App = () => {
  /**
   * Estado que contiene la lista de guitarras disponibles
   * Inicializado con los datos de la base de datos
   * @type {[Array, Function]}
   */
  const [guitars] = useState(db);
  
  /**
   * Hook personalizado para gestionar el carrito de compras
   */
  const { cart, addToCart, delFromCart, updateQuantity, clearCart } = useCart();

  return (
    <>
      { /* Header */ }
      <Header cart={cart} 
        delFromCart={delFromCart} 
        updateQuantity={updateQuantity} 
        clearCart={clearCart} />

      { /* Main Content */ }
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            /* Guitars List */
            guitars.map((guitar) => (
              <Guitar guitar={guitar} addToCart={addToCart} key={guitar.id} />
            ))
          }
        </div>

      </main>

      { /* Footer */ }
      <Footer />
    </>
  );
};

export default App;
