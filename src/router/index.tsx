import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import type { ComponentType, PropsWithChildren, FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { pathNames } from '@/constants';
import LoadingComponent from '@/components/LoadingComponent';
import MainLayout from '@/layout/MainLayout';
import { GuardPublicOnly } from '@/guard/GuardPublicOnly';
import { GuardAuthenticated } from '@/guard/GuardAuthenticated';
import { LoginPage, SignupPage } from '@/pages/AuthPage';
import NoChat from '@/components/NoChat';
import DetailConversation from '@/pages/ConversationsPage/DetailConversation';

const Loadable = <P extends object>(Component: ComponentType<P>) => {
  const LazyComponents: FC<P> = (props: PropsWithChildren<P>) => {
    return (
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <LoadingComponent className="h-10 w-10" />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponents;
};

const AuthLayout = Loadable(
  lazy(() => {
    return import('@/layout/AuthLayout');
  })
);

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

const SettingPage = Loadable(
  lazy(() => {
    return import('../pages/SettingPage');
  })
);

const Page404 = Loadable(
  lazy(() => {
    return import('../pages/404Page');
  })
);

const lazyRoutes: RouteObject[] = [
  {
    path: '/',
    errorElement: <Page404 />,
    children: [
      {
        path: pathNames.login,
        element: (
          <GuardPublicOnly>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </GuardPublicOnly>
        ),
      },
      {
        path: pathNames.signup,
        element: (
          <GuardPublicOnly>
            <AuthLayout>
              <SignupPage />
            </AuthLayout>
          </GuardPublicOnly>
        ),
      },
      {
        path: '',
        element: (
          <GuardAuthenticated>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </GuardAuthenticated>
        ),
        children: [
          {
            element: (
              <ConversationsPage>
                <Outlet />
              </ConversationsPage>
            ),
            path: pathNames.conversation,
            children: [
              { element: <DetailConversation />, path: ':conversationId' },
              { element: <NoChat />, path: '' },
            ],
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
            element: <SettingPage />,
            path: pathNames.setting,
          },
          {
            element: <Navigate to={pathNames.conversation} replace />,
            path: pathNames.home,
          },
          {
            element: <Page404 />,
            path: '*',
          },
        ],
      },
    ],
  },
];

const Router = () => {
  const contents = useRoutes(lazyRoutes);
  return <>{contents}</>;
};

export default Router;
