import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/global.css'
import { ThemeProvider } from "@/components/ui/theme-provider" // Ensure this path is correct

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* CRITICAL: Wrap the entire application with the ThemeProvider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)