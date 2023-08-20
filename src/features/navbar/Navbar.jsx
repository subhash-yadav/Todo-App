import React from "react";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/authSlice";
const Navbar = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  return (
    <div className="navbar">
      <div className="header">
        <div className="header-content container">
         {<h4 className="header-content__title">Hello {user?.name} Welcome</h4>}
        </div>
      </div>
      <main className="container">{children}</main>
    </div>
  );
};

export default Navbar;
