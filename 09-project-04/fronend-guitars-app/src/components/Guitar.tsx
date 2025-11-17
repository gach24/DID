
type GuitarProps = {
  guitar: Guitar;
  addToCart: (guitar: Guitar) => void;
};


export const Guitar = ({ guitar, addToCart }: GuitarProps) => {

  /**
   * Destructuración de las propiedades de la guitarra
   * para acceso más sencillo en el componente
   */
  const { name, image, description, price } = guitar;

  /**
   * Manejador de evento para el botón de agregar al carrito
   * Llama a la función addToCart con el objeto guitar completo
   * 
   * @param {Object} guitar - Objeto de la guitarra a agregar
   */
  const handleClick = (guitar: Guitar) => {
    addToCart(guitar);
  };

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img className="img-fluid" src={`/img/${image}.jpg`} alt={name} />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          // onClick={handleClick(id)}
          onClick={() => handleClick(guitar)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
