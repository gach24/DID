import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CounterApp } from './CounterApp'
import { Header } from './Header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <Header 
        title="Counter App" 
        description="A simple counter application using a custom hook." />
      <CounterApp />
    </>
  </StrictMode>,
)
