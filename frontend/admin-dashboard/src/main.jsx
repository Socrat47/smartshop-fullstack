import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>
)
