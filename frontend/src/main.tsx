// React
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Router
import { HashRouter } from 'react-router-dom'

// Styles
import './index.css'

createRoot(document.getElementById('root')!).render(

  <HashRouter>
    <App />
  </HashRouter>
)
