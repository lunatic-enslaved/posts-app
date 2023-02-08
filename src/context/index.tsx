import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  isAuth: boolean;
  setAuth: (payload: boolean) => void;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [isAuth, _setAuth] = React.useState(
    JSON.parse(localStorage.getItem("auth") || "false")
  );
  const navigate = useNavigate();
  const setAuth = React.useCallback(
    (payload: boolean) => {
      localStorage.setItem("auth", JSON.stringify(payload));
      _setAuth(payload);

      if (isAuth !== payload) {
        if (payload) {
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    },
    [navigate, isAuth]
  );

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
