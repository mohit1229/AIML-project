import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import BankNoteClassifier from './bank-note-classifier-app.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App />
     */}
     {/* <BankNoteClassifier></BankNoteClassifier> */}
     <App></App>
  </StrictMode>,
)
