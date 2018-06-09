import React, {Component} from 'react';
import App from './App';
import {Redirect} from 'react-router-dom';

class AppController extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      chiefMode: true,
    }
  }

  toggleChiefMode = () => {
    this.setState({
      chiefMode: !this.state.chiefMode
    });
  } 
    //TODO: Change this method to provide proper authentication 
    //(can send chief mode inside a JWT token)

  toggleLogin = () => {
    this.setState({
      authenticated: !this.state.authenticated
    });
  } //TODO: Change this method to provide proper authentication (can use jwt verify)

  render() {
    /** 
     * <App /> has no internal state, 
     * all state is controlled by <AppController>
     *  and passed down as props to <App> 
    */
    return <App
      authenticated={this.state.authenticated}
      chiefMode={this.state.chiefMode}
      toggleLogin={this.toggleLogin}
      toggleChiefMode={this.toggleChiefMode}
    />;
  }
}

export default AppController;