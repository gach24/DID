import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage, GuitarPage } from './pages/';
import { CartProvider } from './context';
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router";
import { getGuitars, getGuitarsById } from './api/actions';

import { Footer, Header } from './components';

import './index.css';


/* const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => getGuitars(),
    HydrateFallback: () => <div>Cargando...</div>
  },
  {
    path: '/:id',
    element: <GuitarPage />,
    loader: async ({ params }) => getGuitarsById(params.id!),
    HydrateFallback: () => <div>Cargando...</div>
  }

]); */

export const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader: async () => getGuitars(),
        HydrateFallback: () => <div>Cargando...</div>
      },
      {
        path: '/:id',
        element: <GuitarPage />,
        loader: async ({ params }) => getGuitarsById(params.id!),
        HydrateFallback: () => <div>Cargando...</div>
      }
    ]
  }
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
