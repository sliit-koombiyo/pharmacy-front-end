import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class PrescriptionDetails extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.openPayment();
    this.props.toggle()
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.props.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.props.toggle}>Prescription : {this.props.prescription._id}</ModalHeader>
          <ModalBody>
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                  <th>Drug</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Period</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
              {(
                this.props.prescription.prescriptionItems !== undefined)?
                this.props.prescription.prescriptionItems.map((item, index) => {
                    return <tr key={index}>
                        <td>{item.drug}</td>
                        <td>{item.dosage}</td>
                        <td>{item.frequency}</td>
                        <td>{item.duration}</td>
                        <td>{item.quantity}</td>
                    </tr>
                }) : <tr><td></td><td></td><td></td><td></td><td></td></tr>}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
          {!this.props.prescription.dispensed?<Button color="primary" onClick={this.toggle}>Dispense</Button>:null}
            {' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PrescriptionDetails;