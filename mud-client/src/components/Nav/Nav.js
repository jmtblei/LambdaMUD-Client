import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const Logout = event => {
    localStorage.clear();
  };

  return (
    <nav>
      <h2>Game Land</h2>
      <NavLink to='/' onClick={Logout}>
        Log Out
      </NavLink>
    </nav>
  );
};

export default Nav;
