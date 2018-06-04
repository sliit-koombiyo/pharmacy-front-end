import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './SideNav.css';
import {Nav, NavItem, Button} from "reactstrap";
import FA from "react-fontawesome";

class SideNav extends Component {

  // TODO: remove this method
  changeChiefMode = () => {
    console.log('changeChiefMode');
    this.props.toggleChiefMode()
  }
  // TODO: remove this method
  logout = () => {
    console.log('logging out');
    this.props.toggleLogin();
  }


  render() {

    return (
      <div className="sideNavDiv">
        <hr style={{borderColor: "#A5AFB9"}}/>
        <Nav vertical>
          {
            this.props.routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.

              <NavItem key={index}>
                <NavLink exact={route.exact} activeClassName='activeNavClass' to={route.path}><FA
                  name={route.FA_name}/> {route.title}</NavLink>
              </NavItem>
            ))


          }
        </Nav>
        {/*TODO: remove this button*/}
        <Button onClick={this.changeChiefMode}>changeMode</Button>
        <div className="sidebarFiller"></div>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );

  }
}

export default SideNav;