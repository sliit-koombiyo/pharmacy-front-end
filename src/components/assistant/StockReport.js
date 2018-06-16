import React, { Component } from 'react';
import * as html2canvas from 'html2canvas';
import * as axios from 'axios';
import jsPDF from 'jspdf';
import {
    Button,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table
  } from 'reactstrap';
  


class StockReport extends Component {
  constructor() {
    super();
    this.state={
    prescriptions: [],
      stocks: [],
      selectedPrescription: {},
      results: [],
      prescriptionDetailsOpen: false,
      paymentOpen: false
  }
  }
  componentDidMount() {
    // set the access token for every request
    axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };

    axios.get('https://koombiyo-pharmacy.herokuapp.com/prescriptions').then((response) => {
      this.setState({ prescriptions: response.data, results: response.data })
    })
    axios.get('https://koombiyo-pharmacy.herokuapp.com/drugs').then((response) => {
      console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
      this.setState({ stocks: response.data.data })
    })
  }

  printBill = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("bill.pdf");
      });
  }

  render() {
    return (<div>
      <div className="mb5">
        <button onClick={this.printBill}>Save PDF</button>
      </div>
      <div id="divToPrint" className="mt4" style={{
        padding: 5,
        backgroundColor: '#f5f5f5',
        width: '210mm',
        minHeight: '297mm',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3>Pharmacy Drug Stock Report</h3>
        <div>
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

        </div>
      </div>
    </div>);
  }
}

export default StockReport;