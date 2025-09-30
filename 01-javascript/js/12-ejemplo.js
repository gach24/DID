async function crearPost() {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    const datos = await respuesta.json();
    console.log("Post creado:", datos);
  } catch (error) {
    console.error("Error en la creación:", error);
  }
}

crearPost();

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));