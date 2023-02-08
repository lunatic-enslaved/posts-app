import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cn from "classnames";

import { AuthContext } from "../../context";

import classes from "./index.module.css";
import { Button } from "../UI/Button";

export const TheNavbar = () => {
  const { isAuth, setAuth } = React.useContext(AuthContext);

  const getClasses: NavLinkProps["className"] = ({ isActive }) =>
    cn(classes.link, { [classes.link__active]: isActive });

  return (
    <div className={classes.navbar}>
      <div className={classes.items}>
        <NavLink to="/" className={getClasses}>
          Home
        </NavLink>
        <NavLink to="/posts" className={getClasses}>
          Posts
        </NavLink>
        <NavLink to="/about" className={getClasses}>
          About
        </NavLink>
      </div>

      {isAuth && <Button onClick={() => setAuth(false)}> Выйти </Button>}
    </div>
  );
};
