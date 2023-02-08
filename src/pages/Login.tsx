import React from "react";

import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { AuthContext } from "../context";

const Login = () => {
  const { setAuth } = React.useContext(AuthContext);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuth(true);
  };

  return (
    <section>
      <h1>Страница для логина</h1>
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="Логин" required />
        <Input type="password" placeholder="Пароль" required />
        <Button>Войти</Button>
      </form>
    </section>
  );
};

export default Login;
