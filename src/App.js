import React, {Component} from 'react';
import Login from './components/Login/Login';
import SideNav from './components/SideNav/SideNav';
import MainContent from './components/MainContent/MainContent';
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import {Col} from "reactstrap";
import Home from "../src/components/Home/Home";
import './App.css';

class App extends Component {

  render() {

    let routes;
    routes = this.props.chiefMode ? [
      {
        path: '/app',
        exact: true,
        FA_name:"tachometer-alt",
        title: 'Home (chief)',
        main: () => <Col>CHIEF <Home/></Col>
      },
      {
        path: '/app/send-requests',
        FA_name:"stethoscope",
        title: 'Send Requests (chief)',
        main: () => <Col><h2>CHIEF Send Requests</h2></Col>
      },
      {
        path: '/app/shoelaces',
        FA_name:"heartbeat",
        title: 'Shoe laces (chief)',
        main: () => <Col><h2>CHIEF Shoelaces</h2></Col>
      },
    ] : [
      {
        path: '/app',
        exact: true,
        FA_name:"tachometer-alt",
        title: 'Home',
        main: () => <Col><Home/></Col>
      },
      {
        path: '/app/send-requests',
        FA_name:"stethoscope",
        title: 'Send Requests',
        main: () => <Col><h2>Send Requests</h2></Col>
      },
      {
        path: '/app/shoelaces',
        FA_name:"heartbeat",
        title: 'Shoe laces',
        main: () => <Col><h2>Shoelaces</h2></Col>
      },
    ];

    const PrivateRoute = ({component: Component, exact, strict, path, ...rest}) => (
      <Route
        exact={exact}
        strict={strict}
        path={path}
        render={props =>
          this.props.authenticated ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {from: props.location} // so that the route remembers where it got to /login from
              }}
            />
          )
        }
      />
    );

    return (
      <Router>
        <div className='appDiv'>
          <Route path='/login'
                 render={
                   routeProps => <Login {...routeProps} authenticated={this.props.authenticated}
                                        toggleLogin={this.props.toggleLogin}/>
                 }
          />
          <PrivateRoute
            path="/"
            exact
            component={SideNav}
            routes={routes}
            chiefMode={this.props.chiefMode}
            toggleChiefMode={this.props.toggleChiefMode}
            toggleLogin={this.props.toggleLogin}

          />
          <PrivateRoute
            path="/app"
            component={SideNav}
            routes={routes}
            toggleChiefMode={this.props.toggleChiefMode}
            toggleLogin={this.props.toggleLogin}

          />
          <PrivateRoute
            path="/app"
            component={MainContent}
            routes={routes}
          />
        </div>
      </Router>
    );
  }
}

export default App;
