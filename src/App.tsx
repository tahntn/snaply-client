import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { JwtPayload, jwtDecode } from 'jwt-decode';
import Router from './router';
import { ThemeProvider } from './context/ThemeProvider';
import FallbackRenderer from './components/FallbackRenderer';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
// import moment from 'moment';
import './App.css';
import { storage } from './lib/storage';
import { useAuthStore } from './store';
import { useToast } from './components/ui/use-toast';
import { axiosInstance } from './api/apiConfig';
import axios from 'axios';
import { refreshAccessToken } from './services/auth.service';
import { useLogout } from './hooks/useSignOut';

function App() {
  const { i18n } = useTranslation();
  const { getString } = storage;
  const { setLogin, setLogout } = useAuthStore((state) => state);
  const { toast } = useToast();
  const { mutate: logout } = useLogout();
  React.useEffect(() => {
    const refreshToken = getString('snalpy-refresh');
    const language = getString('snaply-language');

    if (refreshToken) {
      setLogin();
      // const decoded = jwtDecode(refreshToken) as JwtPayload & { type: string };
      // if (decoded?.type === 'refresh' && decoded?.iat && decoded?.exp && decoded?.sub) {
      //   if (decoded.exp && moment.unix(decoded.exp).isAfter(moment())) {
      //     setLogin();
      //   } else {
      //     toast({
      //       variant: 'destructive',
      //       title: 'Uh oh! Something went wrong.2',
      //       description: 'Phiên bản đã hết hạn vui lòng đăng nhập lại',
      //     });
      //   }
      // }
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

  React.useEffect(() => {
    let isRefreshing = false;
    let refreshSubscribers: any = [];

    const subscribeTokenRefresh = (cb: any) => {
      refreshSubscribers.push(cb);
    };

    const onRrefreshed = (token: any) => {
      refreshSubscribers.map((cb: any) => cb(token));
    };
    axiosInstance.interceptors.request.use(async (req) => {
      const accessToken = getString('snalpy-access');
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
      return req;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const {
          config,
          response: { status },
        } = error;
        const originalRequest = config;

        if (status === 498) {
          if (!isRefreshing) {
            isRefreshing = true;
            const refreshToken = getString('snalpy-refresh');
            refreshAccessToken(refreshToken!)
              .then((newToken) => {
                localStorage.setItem('snalpy-access', newToken.data.token);
                isRefreshing = false;
                onRrefreshed(newToken.data.token);
              })
              .catch((err) => {
                toast({
                  variant: 'destructive',
                  title: 'Uh oh! Something went wrong. token expried',
                  description: 'Phiên bản đã hết hạn vui lòng đăng nhập lại',
                });
                logout(refreshToken!);
              });
          }

          const retryOrigReq = new Promise((resolve, reject) => {
            subscribeTokenRefresh((token: any) => {
              // replace the expired token and retry
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(axios(originalRequest));
            });
          });
          return retryOrigReq;
        } else {
          return Promise.reject(error);
        }
      }
    );
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="snaply-theme">
      <TooltipProvider delayDuration={300}>
        <BrowserRouter>
          <ErrorBoundary fallbackRender={FallbackRenderer}>
            <Router />
          </ErrorBoundary>
        </BrowserRouter>
        <Toaster />
        {import.meta.env.VITE_NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
        )}
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
