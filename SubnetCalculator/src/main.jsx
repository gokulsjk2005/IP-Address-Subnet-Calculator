import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Components/Stylesheets/style.css'
import SignUpPage from './Components/SignUpPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignUpPage/>
  </StrictMode>,
)
