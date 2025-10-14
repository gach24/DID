# PASOS

## Extensiones que podemos instalar de VSC

- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

- [ES7 React/Redux](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- [React Simle Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

- [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)

- [Backticks](https://marketplace.visualstudio.com/items?itemName=fractalbrew.backticks)

## Extensiones para Chrome

- [React Devoloper Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=es)

## Creación del proyecto

```sh
npm create vite@latest
```

## Inicialización

- Borramos el archivo App.css
- Borramos las imágenes
- Quitamos el código del archivo `App.jsx` y añadimos el siguiente cógigo

```jsx
const App = () => <h1>Guitar LA</h1>;

export default App;
```

- Vaciamos (no eliminamos) el archivo `index.css`
- Copiamos todo el continido de la carpeta public la carpeta public de nuestro proyecto react
- Sobrescribimos el archivo `index.css` en nuestro proyecto de react
- Copiamos las fuentes de google fonts a nuestro `index.html` de nuestro proyecto de react
- Copiamos el header, main y footer del archivo index.html al archivo `App.jsx`

## HOOKS

Los hooks te permiten utilizar direntes funciones en REACT en tus componentes, React tiene una serie de Hooks pero también puedes utilizar los tuyos
Los hooks se dividen en básicos y adicionales:

- useState
- useEffect
- useContext

- useReducer
- useCallback
- useMemo
- useRef
- ...
