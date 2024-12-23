import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ContextProvider} from "./ContextApi"
import { SocketContextProvider } from './SocketContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </ContextProvider>
  </StrictMode>,
)
