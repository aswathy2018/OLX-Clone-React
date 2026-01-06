import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/Auth.jsx'
import { ItemContextProvider } from './Components/Context/Item.jsx'

createRoot(document.getElementById('root')).render(
  <ItemContextProvider>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </ItemContextProvider>
)
