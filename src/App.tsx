import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Router from './router';
import { ThemeProvider } from './context/ThemeProvider';
import FallbackRenderer from './components/FallbackRenderer';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';

import './App.css';

const queryClient = new QueryClient();
function App() {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    const language = localStorage.getItem('snaply-language');

    if (language === 'vi' || language === 'en') {
      i18n.changeLanguage(language);

      const handleStorageChange = () => {
        const updatedLanguage = localStorage.getItem('snaply-language');
        if (updatedLanguage && updatedLanguage !== i18n.language) {
          i18n.changeLanguage(updatedLanguage);
          localStorage.setItem('snaply-language', updatedLanguage);
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);
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
