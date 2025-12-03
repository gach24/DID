import { useContext } from 'react';
import { useLoaderData, Link } from 'react-router';
import { CartContext } from '../../context';

export const GuitarPage = () => {
  const guitar = useLoaderData() as Guitar;
  const { addToCart } = useContext(CartContext);
  const { name, image, description, price } = guitar;

  const handleAddToCart = () => {
    addToCart(guitar);
  };

  return (
    <>
      <main className="container-xl mt-5">
        <div className="row">
          <div className="col-md-6">
            <img 
              className="img-fluid" 
              src={`/img/${image}.jpg`} 
              alt={name} 
            />
          </div>
          
          <div className="col-md-6">
            <h1 className="text-black fs-2 fw-bold text-uppercase">{name}</h1>
            <p className="mt-4">{description}</p>
            <p className="fw-black text-primary fs-1 mt-4">${price}</p>
            
            <button
              type="button"
              className="btn btn-dark w-100 py-3 mt-4"
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </button>
            
            <Link 
              to="/"
              className="btn btn-outline-dark w-100 py-3 mt-3"
            >
              Volver
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};