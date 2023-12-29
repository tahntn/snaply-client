import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import FallbackRenderer from './components/FallbackRenderer';
import Router from './router';
import { Toaster } from '@/components/ui/toaster';

import './App.css';
import { ThemeProvider } from './context/ThemeProvider';
import { TooltipProvider } from './components/ui/tooltip';

const queryClient = new QueryClient();
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="snaply-theme">
      <TooltipProvider delayDuration={300}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ErrorBoundary fallbackRender={FallbackRenderer}>
              <Router />
            </ErrorBoundary>
          </BrowserRouter>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
