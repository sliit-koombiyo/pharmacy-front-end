import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import Bill from './Bill'; 
class Payment extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.dispense = this.dispense.bind(this);
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
    Axios.post('https://koombiyo-pharmacy.herokuapp.com/prescriptions/dispense', this.props.prescription).then((result)=>{
      console.log(result);
      this.props.refreshPrescriptions()
    }).catch((err)=>{
      console.error(err)
    });
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
            <Bill/>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Payment;