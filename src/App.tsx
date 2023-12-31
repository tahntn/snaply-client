import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Router from './router';
import { ThemeProvider } from './context/ThemeProvider';
import FallbackRenderer from './components/FallbackRenderer';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import moment from 'moment';
import './App.css';
import { storage } from './lib/storage';
import { useAuthStore } from './store';
import { useToast } from './components/ui/use-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  const { i18n } = useTranslation();
  const { getString, setString } = storage;
  const { setAccessToken, setRefreshToken, setLogin } = useAuthStore((state) => state);
  const { toast } = useToast();
  React.useEffect(() => {
    const accessToken = getString('snalpy-access');
    const refreshToken = getString('snalpy-refresh');
    const language = getString('snaply-language');

    //handle token
    if (accessToken) {
      setAccessToken(accessToken);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);

      const decoded = jwtDecode(refreshToken) as JwtPayload & { type: string };
      if (decoded?.type === 'refresh' && decoded?.iat && decoded?.exp && decoded?.sub) {
        if (decoded.exp && moment.unix(decoded.exp).isAfter(moment())) {
          setLogin();
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.2',
            description: 'Phiên bản đã hết hạn vui lòng đăng nhập lại',
          });
        }
      }
    }

    //handle language
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
          {import.meta.env.VITE_NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
          )}
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
