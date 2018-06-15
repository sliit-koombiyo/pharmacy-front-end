import React, {Component} from 'react';
import Login from './components/Login/Login';
import SideNav from './components/SideNav/SideNav';
import MainContent from './components/MainContent/MainContent';
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';
import {Col} from "reactstrap";
import AssistantHome from './components/assistant/AssistantHome';
import AddDrugs from './components/Drugs/AddDrugs';
import ManageGRN from './components/chief/ManageGRN';
import ChiefHome from './components/chief/ChiefHome';
import ViewRequests from './components/chief/ViewRequests';
import SendRequests from './components/assistant/SendRequests';

import './App.css';
import AddDrugBatch from './components/Drugs/AddDrugBatch';
import StockReport from './components/assistant/StockReport';

class App extends Component {

  render() {

    /**
     * @description routes is an array of objects which defined each internal route within the app
     * @property path will be the URL
     * @property 'FA_name' the fontAwesome icon name
     * @property 'Title' the link name for the left navigation panel
     * @property component is a function used to make the component shown in the MainContent section
     *  There are 2 arrays; the first one holds the routes and components for the Chief Pharmacist 
     * and the next array holds the routes and components for the assistant   
     */
    let routes;
    routes = this.props.chiefMode ? [
      {
        path: '/app/chiefhome',
        exact: true,
        FA_name:"tachometer-alt",
        title: 'Chief Home',
        component: () => <Col><ChiefHome/></Col>
      },
      {
        path: '/app/send-requests',
        FA_name:"stethoscope",
        title: 'View Requests',
        component: () => <Col><ViewRequests/></Col>
      },
     
      {
        path: '/app/add_drugs',
        FA_name:"capsules",
        title: 'Add Drugs',
        component: () => <Col><AddDrugs/></Col>
      },
      {
        path: '/app/manage_grn',
        FA_name:"capsules",
        title: 'Manage GRN',
        component: () => <Col><ManageGRN/></Col>
      },
      {
        path: '/app/add_drugBatch',
        FA_name:"prescription-bottle-alt",
        title: 'Drug Batch',
        component: () => <Col><AddDrugBatch/></Col>
      },
     
    ] 
    
    : 
    
    [
      {
        path: '/app',
        exact: true,
        FA_name:"tachometer-alt",
        title: 'Assistant Home',
        component: () => <Col><AssistantHome/></Col>
      },
      {
        path: '/app/shoelaces',
        FA_name:"heartbeat",
        title: 'Send Requests',
        component: () => <Col><SendRequests/></Col>
      },
      {
        path: '/app/stock_report',
        FA_name:"heartbeat",
        title: 'Stock Report',
        component: () => <Col><StockReport/></Col>
      },
      
    ];

    /** this is a wrapper for <Route> which enables 
     * redirecting to login if not authenticated
    */
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
