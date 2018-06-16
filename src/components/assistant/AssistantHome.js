import React, { Component } from 'react';
import * as axios from 'axios';
import PrescriptionDetails from './PrescriptionDetails';
import Payment from './Payment';
import {ToastContainer, ToastStore} from 'react-toasts';
import {
  Button,
  Card, CardBody, CardSubtitle, CardText, CardTitle,
  CardHeader, CardFooter, Table
} from 'reactstrap';
class AssistantHome extends Component {

  constructor() {
    super();
    this.state = {
      allPrescriptions: [],
      stocks: [],
      selectedPrescription: {},
      results: [],
      prescriptionDetailsOpen: false,
      paymentOpen: false
    }
  }
  refreshPrescriptions = () => {
    axios.get('https://koombiyo-pharmacy.herokuapp.com/prescriptions').then((response) => {
      this.setState({ allPrescriptions: response.data, results: response.data }, () => {
        console.log("prescriptions refreshed" + this.state.results);
        ToastStore.success('results refreshed !');
      })
    }).catch((err=>{
      console.log(JSON.stringify(err))
      ToastStore.warning("cannot get prescriptions " + err.response.data.message);
    }))
  }
  componentDidMount() {

    // set the access token for every request
    axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };

    this.refreshPrescriptions();
    axios.get('https://koombiyo-pharmacy.herokuapp.com/drugs').then((response) => {
      console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
      this.setState({ stocks: response.data.data })
    })
  }

  toast = (message) => {
    ToastStore.success(message);
  }

  toggleModal = () => {
    this.setState({ prescriptionDetailsOpen: !this.state.prescriptionDetailsOpen });
  }

  togglePaymentModal = () => {
    this.setState({ paymentOpen: !this.state.paymentOpen });
  }

  handleClick = (evt) => {
    console.log(evt.target.getAttribute('tempdata'));
    let selected = this.state.allPrescriptions.find((prescription) => {
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
    this.tempArray = this.state.allPrescriptions;
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
            <div className="d-flex justify-content-between">
              <input type="text" onChange={this.handleSearch} />
            </div>
            <hr />
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                  <th>Prescription ID</th>
                  <th>Patient HIN</th>
                  <th>Patient Name</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.results.map((prescription, index) => {
                    return <tr key={index}>
                      <td>{prescription._id.substr(prescription._id.length - 5)}</td>
                      <td>{prescription.patientID}</td>
                      <td>{prescription.patientName}</td>
                      <td>{this.formatDate(prescription.createdAt)}</td>
                      <td>{prescription.dispensed ? "Dispensed" : "Pending"}</td>
                      <td>
                        <Button color="link" tempdata={prescription._id} onClick={this.handleClick}>{prescription.dispensed ? "view" : "view & dispense"}</Button>
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
              refreshPrescriptions={this.refreshPrescriptions}
              toast={this.toast}
            />
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drug Stock</CardHeader>
          <CardBody>
            <CardTitle>Stock</CardTitle>
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                <th>Drug ID</th>
                      <th>Drug Name</th>
                      <th>Drug Stock</th>
                      <th>Drug Type</th>
                      <th>Price</th>
                      <th>Danger Level</th> 
                      <th>ReorderLevel</th>

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
                          <td>{element.type}</td>
                          <td>{element.price}</td>
                          <td>{element.dangerlevel}</td>
                          <td>{element.reorderLevel}</td>
                          <td>{element.category}</td>
                      </tr>
                    }) : <tr><td></td><td></td><td></td></tr>
                }
              </tbody>
            </Table>
            
          </CardBody>
        </Card>
        <ToastContainer store={ToastStore}/>
      </div>
    );
  };

}

export default AssistantHome;