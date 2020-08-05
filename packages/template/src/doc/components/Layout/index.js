import React from "react";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <header>Header</header>
      <nav>
        <Sidebar />
      </nav>
      <main>{children}</main>
      <footer>copyright</footer>
    </div>
  );
};

export default Layout;
