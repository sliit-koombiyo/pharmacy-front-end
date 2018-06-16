import React, { Component } from 'react';
import {
  Input, Button, Label, Card, Alert,
  Modal, ModalHeader, ModalBody, Form, FormGroup
} from 'reactstrap';
import {ToastContainer, ToastStore} from 'react-toasts';
import { decode } from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import axios from 'axios';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      registerModalOpen: false,
      registerAlertOpen: false,
      registerAlertText: '',
      recoveryModalOpen: false,
      recoveryAlertOpen: false,
      recoveryAlertText: '',
      EmpID: '',
      username: '',
      password: '',
      role: '',
      joinedYear: '',
      errorOpen: false,
      errorText: '',
      alertColor: 'danger'
    };
  }

  componentDidMount() {
    if (navigator.cookieEnabled) {
      console.log("Cookies enabled");
    } else {
      ToastStore.error("WARNING! Cookies must be enabled!");
    }
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

  toggleModal1 = () => {
    this.setState({
      recoveryModalOpen: !this.state.recoveryModalOpen
    })
  };

  login = () => {
    console.log('login called');
    axios.post('https://koombio-auth.herokuapp.com/auth', {username: this.state.username, password: this.state.password}).then((result)=>{
      if(result.data.success) {
        console.log(result.data);
        localStorage.setItem("xPharmacyToken", result.data.token);
        const decodedToken = decode(result.data.token);
        console.log(decodedToken.data.role);
        this.props.mainLogin(decodedToken.data.role === "chief pharmacist");
      } else {
        ToastStore.warning("invalid credentials");
      }
    }).catch((err)=>{
      console.log("error in api call " + err)
    })
    // this.props.mainLogin();
    this.setState({ redirectToReferrer: true });
  };


  register = () => {

    if (this.state.inputEmpID && this.state.inputUsername && this.state.inputPassword && this.state.inputRole && this.state.inputJoinedYear) {
       const newUser = {
        empID: this.state.inputEmpID,
        userName: this.state.inputUsername,
         password: this.state.inputPassword,
         role: this.state.inputRole,
        //  joinedYear: this.state.inputJoinedYear  
       }

      console.log('all fields OK : ' + JSON.stringify(newUser));
       axios.post('https://koombio-auth.herokuapp.com/user/register', newUser).then((response) => {
         if (response.data.success) {
           console.log('response from order API ' + JSON.stringify(response.data));
           this.setState({
             errorText: 'Registration Successful! Login with your new credentials',
             errorOpen: true,
             alertColor: 'success'
           });
           this.toggleModal1();
         } else {
           this.setState({
             registerAlertOpen: true,
             registerAlertText: response.data.err
           }, () => {
             setTimeout(() => {
               this.setState({
                 registerAlertOpen: false
               })
             }, 400)
           });
         }
       }).catch(function (error) {
         console.log('error in API call ' + JSON.stringify(error.message));
       });

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

  recoverPassword =()=>{
    if (this.state.inputEmpID && this.state.inputUsername && this.state.inputPassword) {
      const newPassword = {
        EmpID: this.state.inputEmpID,
        username: this.state.inputUsername,
        password: this.state.inputPassword
      }

      console.log('all fields OK');
      axios.put('https://koombio-auth.herokuapp.com/user/:userName', newPassword).then((response) => {
         if (response.data.success) {
           console.log('response from order API ' + JSON.stringify(response.data));
           this.setState({
             errorText: 'Password Recovery Successful! Login with your new credentials',
             errorOpen: true,
             alertColor: 'success'
           });
           this.toggleModal1();
         } else {
           this.setState({
             recoveryAlertOpen: true,
             recoveryAlertText: response.data.err
           }, () => {
             setTimeout(() => {
               this.setState({
                 recoveryAlertOpen: false
               })
             }, 4000)
           });
         }
       }).catch(function (error) {
         console.log('error in API call ' + JSON.stringify(error.message));
       });

    } else {
      this.setState({
        recoveryAlertOpen: true,
        recoveryAlertText: 'all fields must be filled'
      }, () => {
        setTimeout(() => {
          this.setState({
            recoveryAlertOpen: false
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
            <Button color="primary" onClick={this.login} >Log in</Button>
            <br />
            <div>
              Don't have an account? - <a style={{ color: "#0069d9" }} onClick={this.toggleModal}>Register here</a>
            </div>
            <div>
              Forgot Password? - <a style={{ color: "#0069d9" }} onClick={this.toggleModal1}>Recover here</a>
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
                <Label for="inputEmpID">Employee ID</Label>
                <Input onChange={this.handleInputChange} type="text" name="inputEmpID" id="inputEmpID"
                  placeholder="EmployeeID" />
              </FormGroup>
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
                <Label for="inputRole">Designation</Label>
                <Input onChange={this.handleInputChange} type="text" name="inputRole" id="inputRole"
                  placeholder="Designation" />
              </FormGroup>
              <FormGroup>
                <Label for="inputJoinedYear">Year Joined</Label>
                <Input onChange={this.handleInputChange} type="year" name="inputJoinedYear" id="inputJoinedYear"
                  placeholder="Year Joined" />
              </FormGroup>
              <Button color="primary" onClick={this.register} >Register</Button>
            </Form>
            <hr />
            <Alert isOpen={this.state.registerAlertOpen} color="danger">
              {this.state.registerAlertText}
            </Alert>
          </ModalBody>
        </Modal >

    

        <Modal isOpen={this.state.recoveryModalOpen} toggle={this.toggleModal1} className={this.props.className}>
        <ModalHeader toggle={this.toggleModal1}>Password Recovery</ModalHeader>
          <ModalBody>
            <Form>
            <FormGroup>
                <Label for="inputEmpID">Employee ID</Label>
                <Input onChange={this.handleInputChange} type="text" name="inputEmpID" id="inputEmpID"
                  placeholder="EmployeeID" />
              </FormGroup>
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
              
              <Button color="primary" onClick={this.recoverPassword} >Recover Password</Button>
            </Form>
            <hr />
            <Alert isOpen={this.state.recoveryAlertOpen} color="danger">
              {this.state.recoveryAlertText}
            </Alert>
          </ModalBody>
        </Modal>
        <ToastContainer store={ToastStore}/>
      </div>
    );
  }
}

export default Login;
