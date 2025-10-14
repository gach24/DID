import { useState, useEffect } from 'react';
import { Guitar } from './components/Guitar';
import { Header } from './components/Header';
import { db } from './data/db';

const App = () => {
  const [guitars, setGuitars] = useState([]);
  useEffect(() => {
    console.log(`Cargando datos de guitarras...${guitars.length}`);
    setGuitars(db);
  }, [guitars]);

  return (
    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
