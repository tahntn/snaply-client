import { useAuthStore } from '@/store';
import { ReactNode } from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';

export const GuardPublicOnly = ({ children }: { children: ReactNode }) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const [searchParams] = useSearchParams();

  if (isLogin) {
    const redirect = searchParams?.get('redirect') ?? '/';
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
};
