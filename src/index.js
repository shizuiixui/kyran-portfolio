import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)