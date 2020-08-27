import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import kebabCase from "lodash/kebabCase";
import Layout from "../Layout";
import routes from "../../config/sidebar.yaml";

const App = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.sidebar.map((route, index) => {
              const Component = lazy(() =>
                import(`../../../ds/${route.component}`)
              );
              return (
                <Route
                  key={index}
                  path={`/${kebabCase(route.path || route.name)}`}
                  component={Component}
                  exact
                />
              );
            })}
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
