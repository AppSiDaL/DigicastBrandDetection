import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { BrowserRouter as Router } from 'react-router-dom'

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  )
}
