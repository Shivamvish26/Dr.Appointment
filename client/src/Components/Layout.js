import React from "react";
import "../../src/Components/Styles/Layout.css";
import { AdminMenu, UserMenu } from "./Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // rendering menu list
  const Data = user?.isAdmin ? AdminMenu : UserMenu;

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOC APP</h6>
            <hr />
          </div>
          <div className="menu">
            {Data.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={index} className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icons}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <Badge count={user && user.notification.length}>
                <i class="fa-solid fa-bell"></i>
              </Badge>
              <Link to="/profile">{user?.name}</Link>
            </div>
            
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
