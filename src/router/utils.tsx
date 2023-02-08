import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";

const HomePage = React.lazy(() => import("../pages/Home"));
const PostsPage = React.lazy(() => import("../pages/Posts"));
const PostPage = React.lazy(() => import("../pages/Post"));
const AboutPage = React.lazy(() => import("../pages/About"));
const NoMatchPage = React.lazy(() => import("../pages/NoMatch"));
const ErrorPage = React.lazy(() => import("../pages/Error"));
const LoginPage = React.lazy(() => import("../pages/Login"));

const generateRoute = (props: RouteType): RouteType => ({
  ...props,
  errorElement: <ErrorPage />,
});

const privateRoutes: RouteType[] = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/posts", element: <PostsPage /> },
  { path: "/posts/:id", element: <PostPage /> },
  { path: "*", element: <NoMatchPage /> },
].map((r) => generateRoute({ ...r, needAuth: true }));

const publicRoutes: RouteType[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NoMatchPage /> },
].map((r) => generateRoute({ ...r, needAuth: false }));

export const routes = [...privateRoutes, ...publicRoutes];

type RouteType = { needAuth: boolean } & RouteProps;

interface RouteGuardProps {
  isAuth: boolean;
  needAuth: boolean;
}

export const RouteGuard = (props: RouteGuardProps) => {
  if (!props.isAuth && props.needAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
