import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';

class DrugDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // set the access token for every request
    Axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };
  }

  refreshDrugs(){
    this.props.refreshDrugs()
  }  
  toggle() {
    this.props.toggle()
    
  }
 //This works -------------------//
  DeleteDrug=(evt)=>{
    // console.log(evt.target.getAttribute('tempdata'));
    // const todelete = evt.target.getAttribute('tempdata');
    Axios.delete("https://koombiyo-pharmacy.herokuapp.com//drugs/"+this.props.drug._id).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err);
    })
    this.toggle();
    this.refreshDrugs(); 
  }
//---------------------//
  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Drug : {this.props.drug.name}</ModalHeader>
          <ModalBody>
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Dangerlevel</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td>{this.props.drug.name}</td>
                  <td>{this.props.drug.stock}</td>
                  <td>{this.props.drug.type}</td>
                  <td>{this.props.drug.price}</td>
                  <td>{this.props.drug.dangerlevel}</td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" tempdata={this.props.drug.drugID} onClick={this.DeleteDrug}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DrugDetails;