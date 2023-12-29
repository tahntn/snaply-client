import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import type { ComponentType, PropsWithChildren, FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathNames } from '@/constants';
import LoadingComponent from '@/components/LoadingComponent';
import MainLayout from '@/layout/MainLayout';

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
    return import('../pages/HomePage/index');
  })
);

const ConversationsPage = Loadable(
  lazy(() => {
    return import('../pages/ConversationsPage');
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
    path: pathNames.login,
  },
  {
    element: <SignupPage />,
    path: pathNames.signup,
  },
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        element: <ConversationsPage />,
        path: pathNames.conversation,
      },
      {
        element: <HomePage />,
        path: pathNames.search,
      },
      {
        element: <HomePage />,
        path: pathNames.friendRequest,
      },
      {
        element: <HomePage />,
        path: pathNames.friend,
      },

      {
        element: <Navigate to={pathNames.conversation} replace />,
        path: pathNames.home,
      },
    ],
  },
];

const Router = () => {
  const contents = useRoutes(lazyRoutes);
  return <>{contents}</>;
};

export default Router;
