import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FormSchemaProvider } from './contexts/formSchemaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormSchemaProvider>
      <App />
    </FormSchemaProvider>
  </StrictMode>,
)
