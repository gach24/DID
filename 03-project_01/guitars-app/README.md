# GUITARS APP

## COMPONENTES

- Un componente en react es básicamente html y js en un solo archivo
- React utiliza componentes para la creación de sitios web
- App.jsx es un componente pero demasiado grande
- Normalmente dividiremos los componentes grandes en pequeños componentes reutilizables si es posible

**_Creación del primer componente_**

- Creamos el componente `Header`

## REGLAS DEL JSX

- A diferencia del HTML, que no es estricto, en JSX si un elemento HTML tiene una etiqueta de apertura deberá tener su etiquieta de cierre
- Cada component debe tener un `return` y solo puede devolver un elemento (este elemento puede contener otros elementos)
- No se permite la palabra reservada **class**

**_Eliminación de errores_**

- Sustituimos la palabra **class** por **className**

**_Creación del componente para la guitarra_**

- Creamos el componente en la carpeta de `components`
- Copiamos el código html de una de las guitarras en el componente
- Utilizamos el componente y eliminamos el resto de guitarras
