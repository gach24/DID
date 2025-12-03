
import { Guitar } from '../../components';
import { useLoaderData } from 'react-router';


const HomePage = () => {
  const guitars = useLoaderData();

  return (
    <>

      { /* Main Content */ }
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        
        <div className="row mt-5">
            {
                guitars.map((guitar: Guitar) => (
                  <Guitar guitar={guitar} key={guitar.id} />
                ))
            }
        </div>

      </main>

    </>
  );
};

export { HomePage };
