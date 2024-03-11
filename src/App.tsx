/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Router from './router';
import { ThemeProvider } from './context/ThemeProvider';
import FallbackRenderer from './components/FallbackRenderer';
import { TooltipProvider } from './components/ui/tooltip';
import './App.css';
import { storage } from './lib/storage';
import { useAuthStore } from './store';
import { toast } from 'sonner';
import { axiosInstance } from './api/apiConfig';
import axios from 'axios';
import { refreshAccessToken } from './services/auth.service';
import { useLogout } from './hooks/useSignOut';
import { DialogPreviewImage } from './components/Dialog';
import PusherProvider from './context/PusherProvider';
import { Toaster } from './components/ui/sonner';

function App() {
  const { i18n, t } = useTranslation();
  const { getString } = storage;
  const { setLogin } = useAuthStore((state) => state);
  const { mutate: logout } = useLogout();

  React.useEffect(() => {
    const refreshToken = getString('snalpy-refresh');
    const language = getString('snaply-language');

    if (refreshToken) {
      setLogin();
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
    // eslint-disable-next-line prefer-const
    let refreshSubscribers: any = [];

    const subscribeTokenRefresh = (cb: any) => {
      refreshSubscribers.push(cb);
    };

    const onRrefreshed = (token: any) => {
      refreshSubscribers.map((cb: any) => cb(token));
    };
    axiosInstance.interceptors.request.use(async (req) => {
      const accessToken = getString('snalpy-access');
      const language = i18n.language;
      req.headers['Accept-Language'] = language;
      if (accessToken) {
        req.headers['Authorization'] = 'Bearer ' + accessToken;
      }
      if (req.data instanceof FormData) {
        req.headers['Content-Type'] = 'multipart/form-data';
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
              .catch(() => {
                toast.error(t('setting.error.errorOccurred'));
                logout(refreshToken!);
              });
          }

          const retryOrigReq = new Promise((resolve) => {
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

  React.useEffect(() => {
    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        toast.error(t('setting.error.connectionLost'));
      }
    };

    window.addEventListener('offline', handleNetworkChange);
    return () => {
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  return (
    <PusherProvider>
      <ThemeProvider defaultTheme="light" storageKey="snaply-theme">
        <TooltipProvider delayDuration={300}>
          <BrowserRouter>
            <ErrorBoundary fallbackRender={FallbackRenderer}>
              <Router />
            </ErrorBoundary>
          </BrowserRouter>
          <Toaster position="top-right" richColors />
          <DialogPreviewImage />
          {import.meta.env.VITE_NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={true} position="top-left" />
          )}
        </TooltipProvider>
      </ThemeProvider>
    </PusherProvider>
  );
}

export default App;
