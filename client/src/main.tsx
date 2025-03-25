import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner'
const queryClient = new QueryClient();
document.documentElement.classList.add("dark");
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    <Toaster position="bottom-right" richColors />
    </ThemeProvider>
    </QueryClientProvider>
    
  </StrictMode>,
)
