import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner'
import { PostHogProvider} from 'posthog-js/react'
const queryClient = new QueryClient();
document.documentElement.classList.add("dark");
const options = {
  api_host: import.meta.env.VITE_APP_PUBLIC_POSTHOG_HOST,
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
    apiKey={import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY}
    options={options}
    >
    <QueryClientProvider client={queryClient}>
    <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    <Toaster position="bottom-right" richColors />
    </ThemeProvider>
    </QueryClientProvider>
    </PostHogProvider>
    
  </StrictMode>,
)
