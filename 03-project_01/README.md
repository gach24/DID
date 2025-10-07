# PASOS

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
