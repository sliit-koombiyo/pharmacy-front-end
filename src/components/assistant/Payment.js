import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import Bill from './Bill'; 
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: {},
      billTotal: 0
    }
    this.toggle = this.toggle.bind(this);
    this.dispense = this.dispense.bind(this);
  }

  componentDidMount() {
    Axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };
  }

  componentWillReceiveProps() {

    let tempLineItem;
    let tempBillItems = [];
    let tempbillTotal = 0;
    if(this.props.prescription.prescriptionItems) {
      this.props.prescription.prescriptionItems.map((item)=>{
        tempbillTotal += (item.price * item.quantity);
        tempLineItem = {
          name: item.drug,
          price: item.price,
          quantity: item.quantity
        }
        tempBillItems.push(tempLineItem);
      })
  
      const postData = {
        patient: this.props.prescription.patientName,
        items: tempBillItems
      }

      // added this because the heroku service which runs billing takes a while to start from sleep.. Damsith IT16037434 
      this.setState({billTotal: tempbillTotal});
  
      Axios.post('https://koombiyo-billing-management.herokuapp.com/billing/get-total', postData).then((result)=>{
        console.log("BILL result : " + JSON.stringify(result))
        this.setState({bill: result.data, billTotal: result.data.total});
      }).catch(err=>{
        console.error(err)
      })
    }
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

  dispense() {
    Axios.post('https://koombiyo-billing-management.herokuapp.com/billing/', this.state.bill).then((result)=>{
      console.log("BILL result : " + JSON.stringify(result));
      Axios.post('https://koombiyo-pharmacy.herokuapp.com/prescriptions/dispense', this.props.prescription).then((result)=>{
      console.log(result);
      this.props.toast("Bill payment registered")
      this.props.refreshPrescriptions()
    }).catch((err)=>{
      console.error(err)
    });
    }).catch(err=>{
      console.error(err)
    })
    this.props.toggle()
  }
  
  toggle() {
    this.props.toggle()
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Prescription : {this.props.prescription._id}
          </ModalHeader>
          <ModalBody>
          <div className="d-flex justify-content-end">
            <Button color="primary" style={{marginRight: 10, minWidth: 100}} onClick={this.printBill}> Print </Button>{' '}
            <Button color="success" style={{marginRight: 10, minWidth: 100}} onClick={this.dispense}>Dispense</Button>{' '}
            <Button color="danger" style={{marginRight: 10, minWidth: 100}} onClick={this.toggle}>Cancel</Button>
          </div>
          <hr/>
            <Bill prescription={this.props.prescription} billTotal={this.state.billTotal}/>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Payment;