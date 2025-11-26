import { useContext } from "react";
import { CartContext } from "../context";

/**
 * Componente que muestra el encabezado de la aplicación
 * Incluye logo, navegación y carrito de compras
 * 
 * @component
 * @returns Header con navegación y carrito de compras
 */
export const Header = () => {

  /**
   * Destructuración de las propiedades del carrito
   * para acceso más sencillo en el componente
   */
  const { cart, delFromCart, updateQuantity, clearCart } = useContext(CartContext);

  /**
   * Función para calcular el total del carrito
   * Recorre los ítems del carrito y suma el producto de `price` por `quantity`
   * de cada uno. Si el carrito está vacío, retorna 0.
   *
   * @function getTotal
   * @returns Importe total del carrito en la misma unidad monetaria que `price`.
   */
  const getTotal = () => {
    return cart.reduce((total, {price, quantity}) => total + (price * quantity), 0);
  }

  const renderCart = () => {
    return (
      <> 
      <table className="w-100 table">
        {/* Table Header */}
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        {/* #end Table Header */}

        <tbody>
        {
          /* Cart Items */
          cart.map(({ id, name, image, price, quantity }) => (
              <tr key={id}>
              <td>
                <img
                className="img-fluid"
                src={`/img/${image}.jpg`}
                alt={name} />
              </td>
              <td>{name}</td>
              <td className="fw-bold">${price}</td>
              <td className="flex align-items-start gap-4">
                <button type="button" 
                  className="btn btn-dark"
                  onClick={() => updateQuantity(id, -1)}>
                -
                </button>
                {quantity}
                <button type="button" 
                  className="btn btn-dark"
                  onClick={() => updateQuantity(id, 1)}>
                +
                </button>
              </td>
              <td>
                <button type="button" 
                  className="btn btn-danger" 
                  onClick={() => delFromCart(id)}>
                X
                </button>
              </td>
              </tr>
            )
          )
        }
        </tbody>
      </table>

      { /* Total Amount */ }
      <p className="text-end">
        Total pagar: <span className="fw-bold">${getTotal()}</span>
      </p>
      </>
    );
  }
  
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                {
                  cart.length === 0 ? 
                  (
                    <p className="text-center">El carrito esta vacio</p>
                  )
                  : 
                  (
                    renderCart()
                  ) 
                }
                <button 
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}>
                    Vaciar Carrito
                  </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
