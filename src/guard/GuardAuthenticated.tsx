import { useAuthStore } from '@/store';
import { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

export const GuardAuthenticated = ({ children }: { children: ReactNode }) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { pathname, search } = useLocation();

  if (!isLogin) {
    const redirect =
      !pathname || ['/', '/logout'].includes(pathname)
        ? '/login'
        : `/login?redirect=${pathname}${search ? search : ''}`;
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
};
