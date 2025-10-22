import { useEffect, useState } from 'react';

import { Guitar, Header, Footer } from './components/';

import { db } from './data/db';

const MAX_COUNT_GUITARS = 10;

const initialData = JSON.parse(localStorage.getItem('cart')) ?? [];

const App = () => {
  const [guitars]    = useState(db);
  const [cart, setCart] = useState(initialData);

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart]);

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

  const delFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  }

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

  const clearCart = () => {
    setCart([]);
  }

  return (
    <>
      <Header cart={cart} 
        delFromCart={delFromCart} 
        updateQuantity={updateQuantity} 
        clearCart={clearCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        {/* Guitars List */}
        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar guitar={guitar} addToCart={addToCart} key={guitar.id} />
          ))}
        </div>

      </main>
      <Footer />
    </>
  );
};

export default App;
