import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteGuard, routes } from "./utils";

import { AuthContext } from "../context";

export const Router = () => {
  const { isAuth } = React.useContext(AuthContext);

  console.log(isAuth);

  return (
    <Routes>
      {routes.map(({ needAuth, ...route }) => (
        <Route
          key={route.path}
          element={<RouteGuard isAuth={isAuth} needAuth={needAuth} />}
        >
          <Route {...route} />
        </Route>
      ))}
    </Routes>
  );
};
