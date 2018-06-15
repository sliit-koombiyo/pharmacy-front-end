import React, { Component } from 'react';
import * as axios from 'axios';
import PrescriptionDetails from './PrescriptionDetails';
import Payment from './Payment';
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
      stocks: [],
      selectedPrescription: {},
      results: [],
      prescriptionDetailsOpen: false,
      paymentOpen: false
    }
  }

  componentDidMount() {
    axios.get('https://koombiyo-pharmacy.herokuapp.com/prescriptions').then((response) => {
      this.setState({ prescriptions: response.data, results: response.data })
    })
    axios.get('https://koombiyo-pharmacy.herokuapp.com/drugs').then((response) => {
      console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
      this.setState({ stocks: response.data.data })
    })
  }

  toggleModal = () => {
    this.setState({ prescriptionDetailsOpen: !this.state.prescriptionDetailsOpen });
  }

  togglePaymentModal = () => {
    this.setState({ paymentOpen: !this.state.paymentOpen });
  }

  handleClick = (evt) => {
    console.log(evt.target.getAttribute('tempdata'));
    let selected = this.state.prescriptions.find((prescription) => {
      return prescription._id === evt.target.getAttribute('tempdata');
    })
    this.setState({ selectedPrescription: selected }, () => {
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
    this.tempArray = this.tempArray.filter((pres) => {
      return pres.patientName.search(this.regexp) !== -1 || pres.patientID == evt.target.value;
    })
    this.setState({ results: this.tempArray });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drug Dispense</CardHeader>
          <CardBody>
            <CardTitle>Search by HIN or Patient Name</CardTitle>
            <input type="text" onChange={this.handleSearch} />
            <hr />
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
            <PrescriptionDetails
              prescription={this.state.selectedPrescription}
              open={this.state.prescriptionDetailsOpen}
              openPayment={this.togglePaymentModal}
              toggle={this.toggleModal}
            />
            <Payment
              prescription={this.state.selectedPrescription}
              open={this.state.paymentOpen}
              toggle={this.togglePaymentModal}
            />
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drug Dispense</CardHeader>
          <CardBody>
            <CardTitle>Card</CardTitle>
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                  <th>Drug ID</th>
                  <th>Drug Name</th>
                  <th>Quantity</th>

                </tr>
              </thead>
              <tbody>
                {
                  (
                    this.state.stocks !== undefined) ?
                    this.state.stocks.map((element, index) => {
                      return <tr key={index}>
                        <td>{element.drugID}</td>
                        <td>{element.name}</td>
                        <td>{element.stock}</td>
                      </tr>
                    }) : <tr><td></td><td></td><td></td></tr>
                }
              </tbody>
            </Table>
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