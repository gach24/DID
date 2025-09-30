
function obtenerNumero() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 5000);
  });
}

async function mostrarNumero() {
  const numero = await obtenerNumero();
  console.log("El número es:", numero);
}

mostrarNumero();