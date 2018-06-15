import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './SideNav.css';
import {Nav, NavItem, Button} from "reactstrap";
import FA from "react-fontawesome";
import axios from 'axios';

class SideNav extends Component {

  // TODO: remove this method
  logout = () => {
    console.log('deactivated');
    this.props.mainLogout();
  }

  deactivate = () => {
    axios.delete("https://koombio-auth.herokuapp.com/user/:userName").then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err);
        })
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
        <div className="sidebarFiller"></div>
        <Button color="primary" onClick={this.deactivate}>Deactivate</Button>
        <br/> 
        <br />
        <Button color="primary" onClick={this.logout}>Logout</Button>
      </div>
    );

  }
}

export default SideNav;
