# REACT ROUTER v7.10.0 - Data Mode

## ¿Para qué sirve?

React Router v7.10.0 en **Data Mode** permite crear aplicaciones SPA con **carga de datos integrada** en el enrutamiento. Los datos se cargan **antes** de renderizar los componentes, mejorando la UX y reduciendo el código boilerplate.

**Ventajas del Data Mode:**
- ✅ Datos cargados antes del render (no hay estados de "loading" manuales)
- ✅ Estados de carga automáticos con `useNavigation()`
- ✅ Manejo de errores integrado con `errorElement`
- ✅ Acciones para formularios y mutaciones
- ✅ Configuración de rutas fuera de React (mejor rendimiento)

## Instalación

```bash
npm i react-router
```

## Ejemplo básico - Data Mode

### 1. Crear el router (`router.tsx`)

```ts
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import GuitarDetail from './pages/GuitarDetail';

// Las rutas se definen FUERA de React
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      // Carga datos ANTES de renderizar
      const response = await fetch('/api/guitars');
      return response.json();
    }
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/guitar/:id',
    element: <GuitarDetail />,
    loader: async ({ params }) => {
      // Accede a params.id
      const response = await fetch(`/api/guitars/${params.id}`);
      return response.json();
    }
  }
]);
```

### 2. Configuración en `main.tsx`

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

### 3. Usar datos del loader en el componente

```typescript
import { useLoaderData } from 'react-router-dom';

function Home() {
  // Los datos del loader están disponibles automáticamente
  const guitars = useLoaderData();

  return (
    <div>
      {guitars.map(guitar => (
        <div key={guitar.id}>{guitar.name}</div>
      ))}
    </div>
  );
}
```

### 4. Navegación con `Link`

```typescript
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
```

### 5. Estados de carga con `useNavigation()`

```typescript
import { useNavigation } from 'react-router-dom';

function Home() {
  const navigation = useNavigation();
  const guitars = useLoaderData();

  // Estado automático durante la navegación
  if (navigation.state === 'loading') {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {guitars.map(guitar => (
        <div key={guitar.id}>{guitar.name}</div>
      ))}
    </div>
  );
}
```

### 6. Manejo de errores con `errorElement`

```typescript
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      const response = await fetch('/api/guitars');
      if (!response.ok) {
        throw new Response('Error al cargar', { status: 500 });
      }
      return response.json();
    },
    errorElement: <ErrorPage /> // Se muestra si el loader falla
  }
]);
```

### 7. Acciones para formularios (`action`)

```typescript
export const router = createBrowserRouter([
  {
    path: '/guitar/new',
    element: <NewGuitarForm />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const guitar = {
        name: formData.get('name'),
        price: formData.get('price')
      };
      
      const response = await fetch('/api/guitars', {
        method: 'POST',
        body: JSON.stringify(guitar)
      });
      
      return response.json();
    }
  }
]);
```

```typescript
import { Form, useActionData } from 'react-router-dom';

function NewGuitarForm() {
  const actionData = useActionData(); // Datos de la acción

  return (
    <Form method="post">
      <input name="name" />
      <input name="price" type="number" />
      <button type="submit">Crear</button>
      {actionData && <p>{actionData.message}</p>}
    </Form>
  );
}
```

### 8. `useFetcher` para cargas sin navegación

```typescript
import { useFetcher } from 'react-router-dom';

function SearchBar() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="get" action="/search">
      <input name="q" />
      <button type="submit">Buscar</button>
      {fetcher.state === 'loading' && <div>Buscando...</div>}
      {fetcher.data && <Results data={fetcher.data} />}
    </fetcher.Form>
  );
}
```

## Hooks del Data Mode

- `useLoaderData()`: Accede a los datos del `loader`
- `useActionData()`: Accede a los datos de la `action`
- `useNavigation()`: Estado de navegación (`idle`, `loading`, `submitting`)
- `useFetcher()`: Para cargas de datos sin navegación
- `useParams()`: Obtener parámetros de la URL
- `useRouteLoaderData(id)`: Accede a datos de rutas padre

## Diferencias clave con el modo tradicional

| Modo tradicional | Data Mode |
|-----------------|-----------|
| `BrowserRouter` + `Routes` | `createBrowserRouter` + `RouterProvider` |
| Datos en `useEffect` | Datos en `loader` |
| Estados de carga manuales | Estados automáticos con `useNavigation()` |
| Rutas dentro de React | Rutas fuera de React (mejor rendimiento) |
