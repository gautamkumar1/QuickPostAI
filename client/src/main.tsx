import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
    </QueryClientProvider>
    
  </StrictMode>,
)
