import React, { Component } from 'react';
import * as axios from 'axios';
import PrescriptionDetails from './PrescriptionDetails';
import {
  Button,
  Card, CardBody, CardSubtitle, CardText, CardTitle,
  CardHeader, CardFooter, Table
} from 'reactstrap';

class AssistantHome extends Component {

  constructor() {
    super();
    this.state = {
      prescriptions: [],
      selectedPrescription: {},
      results: [],
      modalOpen: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/prescriptions').then((response) => {
      console.log(JSON.stringify(response.data));
      this.setState({ prescriptions: response.data, results: response.data })
    })
  }

  toggleModal = () => {
    this.setState({modalOpen: !this.state.modalOpen});
  }

  handleClick = (evt) => {
    console.log(evt.target.getAttribute('tempdata'));
    let selected = this.state.prescriptions.find((prescription)=>{
      return prescription._id === evt.target.getAttribute('tempdata');
    })
    this.setState({selectedPrescription: selected}, ()=>{
      this.toggleModal()
    });
  }

  formatDate = (dateString) => {
    let tempDate = new Date(dateString);
    return tempDate.toLocaleDateString();
  }

  handleSearch = (evt) => {
    this.regexp = new RegExp(evt.target.value, "gi");
    this.tempArray = this.state.prescriptions;
    this.tempArray = this.tempArray.filter((pres)=>{
      return pres.patientName.search(this.regexp) !== -1 || pres.patientID == evt.target.value;
    })
    this.setState({results: this.tempArray});
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drug Dispense</CardHeader>
          <CardBody>
            <CardTitle>Search by HIN or Patient Name</CardTitle>
            <input type="text" onChange={this.handleSearch}/>
            <hr/>
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                  <th>Prescription ID</th>
                  <th>Patient HIN</th>
                  <th>Patient Name</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.results.map((prescription, index) => {
                    return <tr key={index}>
                      <td>{prescription._id}</td>
                      <td>{prescription.patientID}</td>
                      <td>{prescription.patientName}</td>
                      <td>{this.formatDate(prescription.createdAt)}</td>
                      <td>
                      <Button color="link" tempdata={prescription._id} onClick={this.handleClick}>view &amp; dispense</Button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            <PrescriptionDetails prescription={this.state.selectedPrescription} open={this.state.modalOpen} toggle={this.toggleModal}/>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <CardTitle>Card</CardTitle>
            <CardSubtitle>Home subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's
              content.
              </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  };

}

export default AssistantHome;