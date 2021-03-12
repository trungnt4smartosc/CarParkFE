import React from "react";
import "./App.css";
import {
  BrowserRouter, Route, Link, Switch, Redirect
} from "react-router-dom";
import SignUp from "./components/signup/signup";
import Login from "./components/login/login";
import Home from "./components/carpark/carpark";
import Details from "./components/details/details";
import axiosInterceptor from './components/api/interceptor.js';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      )}
    />
  );
};

const App = () => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.reload();
  }
  return (
    <BrowserRouter>
      <div className="App">
        <div className="panel">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/login"}>
                Car Park
              </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  {
                    !localStorage.getItem('token') ? (
                      <React.Fragment>
                        <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/signup"}>
                          Sign up
                        </Link>
                      </li>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <li className="nav-item">
                          <Link className="nav-link" to={"/details"}>
                            Details
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a href="" className="nav-link" onClick={logout}>
                            Log Out
                          </a>
                        </li>
                      </React.Fragment>
                    )
                  }
                </ul>
              </div>
            </div>
          </nav>
          <div className="container">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <ProtectedRoute path="/home" component={Home} />
              <ProtectedRoute path="/details" component={Details} />
              <ProtectedRoute exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
