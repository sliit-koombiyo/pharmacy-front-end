import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.dispense = this.dispense.bind(this);
  }

  dispense() {
    Axios.post('http://localhost:5000/prescriptions/dispense', this.props.prescription).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.error(err)
    });
    this.props.toggle()
  }
  
  toggle() {
    this.props.toggle()
  }

  dispense() {
    Axios.post('http://localhost:5000/prescriptions/dispense', this.props.prescription).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.error(err)
    });
    this.props.toggle()
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Prescription : {this.props.prescription._id}</ModalHeader>
          <ModalBody>
            Payments
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.dispense}>Dispense</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Payment;