import React, { Component } from 'react';
import * as axios from 'axios';
import {
  Button, Label, Input,
  Card, CardBody, CardSubtitle, CardText, CardTitle,
  CardHeader, CardFooter, Table, Form
} from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const DropDownFortypes = ["pills", "Table", "Cream", "Syrup"];
const defaultOption = DropDownFortypes[0];


class SendRequests extends Component {


  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      requests: [],
      selectedRequest: {},
      modalOpen: false
    }
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  componentDidMount() {
    // set the access token for every request
    axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };
    
    axios.get('https://koombiyo-pharmacy.herokuapp.com/requests').then((response) => {
      console.log(JSON.stringify("request list" + JSON.stringify(response.data.data)));
      this.setState({ requests: response.data.data })
    });


  }

  handleSubmit(event) {
    event.preventDefault();

    const postBody = {
      requestID: event.target.requestID.value,
      drugName: event.target.drugName.value,
      requestedQuantity: event.target.requestedQuantity.value,
      availableQuantity: event.target.availableQuantity.value,
      department: event.target.department.value

    }

    console.log("form data : " + JSON.stringify(postBody))
    // try creating an object using the above -> event.target.drugID.value
    //and pass that object to the axios post method

    axios.post("https:/koombiyo-pharmacy.herokuapp.com/requests",postBody);
  }

  showDetails = (evt) => {
    // console.log(evt.target.getAttribute('tempdata'));
    let selected = this.state.requests.find((request) => {
      return request._id === evt.target.getAttribute('tempdata');
    })
    this.setState({ selectedRequest: selected }, () => {
      this.toggleModal()
    });

  }
  // goToUpdate= (evt) => {
  //   // console.log(evt.target.getAttribute('tempdata'));
  //   let selected = this.state.drugs.find((drug)=>{
  //     return drug._id === evt.target.getAttribute('tempdata');
  //   })
  //   this.setState({selectedDrug: selected}, ()=>{
  //     this.toggleModal()
  //  });

  // }



  render() {
    return (
      <div>
        <Card>
          <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>SendRequests</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <b><Label htmlFor="requestID">Request ID</Label></b>
              <Input id="requestID" name="requestID" type="text" placeholder="Enter Request ID here" />
              <br></br>
              <Label htmlFor="drugName" >Drug Name</Label>
              <Input id="drugName" name="drugName" type="text" placeholder="Enter Drug name here" />
              <br></br>
              <Label htmlFor="requestedQuantity">Requesting Quantity</Label>
              <Input id="requestedQuantity" name="requestedQuantity" type="text" placeholder="Enter requesting quantity here" />
              <br></br>
              <Label htmlFor="availableQuantity">Available Quantity</Label>
              <Input id="availableQuantity" name="availableQuantity" type="text" placeholder="Enter available quantity here" />
              <br></br>
              <Label htmlFor="department">Department</Label>
              <Input id="department" name="department" type="text" placeholder="Enter the relevant department here" />
              <br></br>
              <input type="submit" value="Send Request"/>
            </Form>
          </CardBody>

        </Card>
      </div>
    );
  };

}

export default SendRequests; 
