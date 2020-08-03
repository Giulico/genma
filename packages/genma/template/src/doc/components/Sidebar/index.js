import React from "react";
import { Link } from "react-router-dom";
import routes from "../../config/sidebar.json";

import kebabCase from "lodash/kebabCase";

const Sidebar = () => {
  return (
    <ul>
      {routes.sidebar.map((route, index) => (
        <li key={index}>
          <Link to={`/${kebabCase(route.name)}`}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
