import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import type { ComponentType, PropsWithChildren, FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathNames } from '@/constants';
import LoadingComponent from '@/components/LoadingComponent';

const Loadable = <P extends object>(Component: ComponentType<P>) => {
  const LazyComponents: FC<P> = (props: PropsWithChildren<P>) => {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponents;
};

const HomePage = Loadable(
  lazy(() => {
    return import('../pages/HomePage');
  })
);

const LoginPage = Loadable(
  lazy(() => {
    return import('../pages/LoginPage');
  })
);

const SignupPage = Loadable(
  lazy(() => {
    return import('../pages/SignupPage');
  })
);

const lazyRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <SignupPage />,
    path: '/signup',
  },
  {
    element: <HomePage />,
    path: pathNames.home,
  },
];

const Router = () => {
  const contents = useRoutes(lazyRoutes);
  return <>{contents}</>;
};

export default Router;
