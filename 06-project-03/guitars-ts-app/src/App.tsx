import { useState } from 'react';


import { useCart } from './hooks/useCart';
import { db } from './data/db';
import { Header, Guitar, Footer } from './components';


const App = () => {

  const [guitars] = useState<Guitar[]>(db);
  
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
