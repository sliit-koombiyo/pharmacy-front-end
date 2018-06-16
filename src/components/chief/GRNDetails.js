import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';

class GRNDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle()
  }

  componentDidMount() {
    // set the access token for every request
    Axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };
  }

  DeleteGRN=(evt)=>{
    console.log(evt.target.getAttribute('tempdata'));
    const todelete = evt.target.getAttribute('tempdata');
    Axios.delete("https://koombiyo-pharmacy.herokuapp.com/grn"+todelete).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err);
    })
    this.toggle();
    
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Good Received Notes {this.props.name}</ModalHeader>
          <ModalBody>
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                  <th>Note ID</th>
                  <th>Supplier Name</th>
                  <th>Ordered Quantity</th>
                  <th>Delivered Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td>{this.props.grn.noteID}</td>
                  <td>{this.props.grn.supplier}</td>
                  <td>{this.props.grn.orderQuantity}</td>
                  <td>{this.props.grn.deliveredQuantity}</td>
                  <td>{this.props.grn.amount}</td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" tempdata={this.props.grn._id} onClick={this.DeleteGRN}>Delete</Button>{' '} */}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default GRNDetails;