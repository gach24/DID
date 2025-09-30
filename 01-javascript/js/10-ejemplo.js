
const miPromesa = new Promise((resolve, reject) => {
  let exito = true;

  if (exito) {
    resolve("La operación fue exitosa");
  } else {
    reject("Hubo un error en la operación");
  }
});

miPromesa
  .then((mensaje) => {
    console.log(mensaje);
  })
  .catch((error) => {
    console.error(error);
  });

console.log("Esto se ejecuta antes de que la promesa se resuelva o rechace.");  


function obtenerDatos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const datos = ["JS", "TS", "React"];
      if (datos.length > 0) {
        resolve(datos);
      } else {
        reject("No se encontraron datos");
      }
    }, 5000);
  });
}

obtenerDatos()
  .then(lista => console.log("Datos:", lista))
  .catch(err => console.error(err));

console.log("Esto también se ejecuta antes de que la promesa se resuelva o rechace.");