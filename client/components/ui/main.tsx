import React from 'react'
import ReactDOM from 'react-dom/client'
// CHANGE 1: Use the alias "@" for App
import App from '@/App.tsx'
// CHANGE 2: Use the alias "@" for global.css
import '@/global.css'
// This one should work now that the file exists and we use the alias
import { ThemeProvider } from "@/components/ui/theme-provider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)