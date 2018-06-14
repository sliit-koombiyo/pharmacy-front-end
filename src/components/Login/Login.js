import React, { Component } from 'react';
import {
  Input, Button, Label, Card, Alert,
  Modal, ModalHeader, ModalBody, Form, FormGroup
} from 'reactstrap';
import { Redirect } from "react-router-dom";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      registerModalOpen: false,
      registerAlertOpen: false,
      registerAlertText: '',
      username: '',
      password: '',
      errorOpen: false,
      errorText: '',
      alertColor: 'danger'
    };
  }

  updateUsernameValue = (evt) => {
    this.setState({
      username: evt.target.value
    })
  };

  updatePasswordValue = (evt) => {
    this.setState({
      password: evt.target.value
    })
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  toggleModal = () => {
    this.setState({
      registerModalOpen: !this.state.registerModalOpen
    })
  };

  login = () => {
    console.log('login called');
    this.props.toggleLogin();
    this.setState({ redirectToReferrer: true });
  };

  register = () => {

    if (this.state.inputUsername && this.state.inputPassword && this.state.inputEmail && this.state.inputPhone) {
      // const newUser = {
      //   username: this.state.inputUsername,
      //   password: this.state.inputPassword,
      //   email: this.state.inputEmail,
      //   phone: this.state.inputPhone,
      //   admin: false
      // }

      console.log('all fields OK');
      // axios.post(appConfigs.REGISTRATION_URL, newUser).then((response) => {
      //   if (response.data.success) {
      //     console.log('response from order API ' + JSON.stringify(response.data));
      //     this.setState({
      //       errorText: 'Registration Successful! Login with your new credentials',
      //       errorOpen: true,
      //       alertColor: 'success'
      //     });
      //     this.toggleModal();
      //   } else {
      //     this.setState({
      //       registerAlertOpen: true,
      //       registerAlertText: response.data.err
      //     }, () => {
      //       setTimeout(() => {
      //         this.setState({
      //           registerAlertOpen: false
      //         })
      //       }, 4000)
      //     });
      //   }
      // }).catch(function (error) {
      //   console.log('error in API call ' + JSON.stringify(error.message));
      // });

    } else {
      this.setState({
        registerAlertOpen: true,
        registerAlertText: 'all fields must be filled'
      }, () => {
        setTimeout(() => {
          this.setState({
            registerAlertOpen: false
          })
        }, 4000)
      });
    }
  };

  render() {
    // const { from } = this.props.location.state || { from: { pathname: "/" } };
    // const { redirectToReferrer } = this.state;

    if (this.props.authenticated) {
      // return <Redirect to={from} />;
      return <Redirect to="/app" />;
    }

    return (
      <div className="loginCardContainer">
        <p>You must log in to view the page</p>
        <Card>
          <div style={{ padding: 20 }}>
            <Label for="usernameInput">Username</Label>
            <Input
              type="text"
              name="username"
              id="usernameInput"
              placeholder="username"
              onChange={this.updateUsernameValue}
            />
            <br />
            <Label for="passwordInput">Password</Label>
            <Input
              type="password"
              name="password"
              id="passwordInput"
              placeholder="password"
              onChange={this.updatePasswordValue}
            />
            <br />
            <Button onClick={this.login}>Log in</Button>
            <br />
            <div>
              Don't have an account? - <a style={{ color: "#0069d9" }} onClick={this.toggleModal}>Register here</a>
            </div>
            <Alert isOpen={this.state.errorOpen} color={this.state.alertColor}>
              {this.state.errorText}
            </Alert>
          </div>
        </Card>
        <Modal isOpen={this.state.registerModalOpen} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>Welcome New User!</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="inputUsername">Username</Label>
                <Input onChange={this.handleInputChange} type="text" name="inputUsername" id="inputUsername"
                  placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Label for="inputPassword">Password</Label>
                <Input onChange={this.handleInputChange} type="password" name="inputPassword" id="inputPassword"
                  placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Label for="inputEmail">E-Mail Address</Label>
                <Input onChange={this.handleInputChange} type="email" name="inputEmail" id="inputEmail"
                  placeholder="user@example.com" />
              </FormGroup>
              <FormGroup>
                <Label for="inputPhone">Phone Number</Label>
                <Input onChange={this.handleInputChange} type="email" name="inputPhone" id="inputPhone"
                  placeholder="Phone" />
              </FormGroup>
              <Button name="registerBtn" onClick={this.register}>Register</Button>
            </Form>
            <hr />
            <Alert isOpen={this.state.registerAlertOpen} color="danger">
              {this.state.registerAlertText}
            </Alert>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Login;