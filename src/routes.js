import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login";
import Loading from "./components/Loading";
import loadable from "react-loadable";
import { isAuthenticated } from "./services/auth";

const App = loadable({
  loader: () => import("./App"),
  loading: Loading
});

const CadUser = loadable({
  loader: () => import("./views/user/CadastroUser"),
  loading: Loading
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const RenderLogin = () => (
  (isAuthenticated() ? <Redirect to={{ pathname: "/", state: { from: "/login" } }} /> : <Login />)
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={() => <RenderLogin />} />
      <Route exact path="/cadastrar/usuario" component={CadUser} />
      <PrivateRoute path="/*" component={() => <App />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;