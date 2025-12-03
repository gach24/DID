/**
 * Componente Footer de la aplicación
 * Muestra el pie de página con información de copyright
 * 
 * @component
 * @returns {JSX.Element} Footer con información de derechos reservados
 */
export const Footer = () => {
  return (
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
    </footer>
  )
}
