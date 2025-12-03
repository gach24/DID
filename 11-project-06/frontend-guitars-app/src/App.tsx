import { useEffect, useState } from 'react';

import { Header, Guitar, Footer } from './components';

// URL de la API de guitarras
const URL: string = `${import.meta.env.VITE_API_URL}/guitars`;

const App = () => {

  // Estado para almacenar las guitarras, opcional
  const [guitars, setGuitars] = useState<Guitar[]>([]);

  useEffect(() => {
    // Carga de guitarras desde la API
    setTimeout(() => {
      fetch(URL)
        .then(response => response.json())
        .then((data) => {
          setGuitars(data.map((g: GuitarDBResponse) =>(
             {
              id: g._id,
              name: g.name,
              image: g.image,
              description: g.description,
              price: g.price,
            }
          )))
        }).catch(error => console.error('Error al cargar las guitarras:', error));
    }, 3000);

  }, [guitars]);
  

  return (
    <>
      { /* Header */ }
      <Header />

      { /* Main Content */ }
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        
        <div className="row mt-5">
            {
              guitars.length === 0 ? (
                <div>Cargando guitarras...</div>
              ) : (
                guitars.map((guitar) => (
                  <Guitar guitar={guitar} key={guitar.id} />
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
