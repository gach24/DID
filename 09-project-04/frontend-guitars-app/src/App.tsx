import { useEffect, useState } from 'react';


import { useCart } from './hooks/useCart';
import { Header, Guitar, Footer } from './components';

const URL: string = import.meta.env.VITE_API_URL;

const App = () => {

  const [guitars, setGuitars] = useState<Guitar[]>([]);

  useEffect(() => {

    setTimeout(() => {
      fetch(URL)
        .then(response => response.json())
        .then((data) => setGuitars(data))
        .catch(error => console.error('Error al cargar las guitarras:', error));
    }, 3000);

  }, [guitars]);
  
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
              guitars.length === 0 ? (
                <div>Cargando guitarras...</div>
              ) : (
                guitars.map((guitar) => (
                <Guitar guitar={guitar} addToCart={addToCart} key={guitar.id} />
                ))
              )
            }
        </div>

      </main>

      { /* Footer */ }
      <Footer />
    </>
  );
};

export default App;
