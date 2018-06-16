import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';

class DrugBatchDetails extends Component {
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

  refreshDrugsBatch(){
    this.props.refreshDrugsBatch()
  }  
  toggle() {
    this.props.toggle()
    
  }
 //This works -------------------//
  DeleteDrugBatch=(evt)=>{
    // console.log(evt.target.getAttribute('tempdata'));
    // const todelete = evt.target.getAttribute('tempdata');
    Axios.delete("https://koombiyo-pharmacy.herokuapp.com/drugBatch/"+this.props.drugBatch._id).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err);
    })
    this.toggle();
    this.refreshDrugsBatch(); 
  }
//---------------------//
  render() {
    return (
      <div>
        {/* <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className} size="lg">
           <ModalHeader toggle={this.toggle}>DrugBatch ID : {this.props.drugBatch.batchID}</ModalHeader>
          <ModalBody>
            <Table striped responsive bordered size="sm">
              <thead>
                <tr>
                  <th>BatchID</th>
                  <th>DrugID</th>
                  <th>Expiry Date</th>
                  <th>Batch Quanity</th>
                </tr>
              </thead>
              <tbody>
                <tr > 
                   <td>{this.props.drugBatch.batchID}</td>
                  <td>{this.props.drugBatch.drugID}</td>
                  <td>{this.props.drugBatch.expiryDate}</td>
                  <td>{this.props.drugBatch.batchQuntity}</td> 
                 </tr>
              </tbody>
            </Table>
          </ModalBody> 
          <ModalFooter>
            <Button color="primary" tempdata={this.props.drugBatch.drugID} onClick={this.DeleteDrugBatch}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter> 
        </Modal> */}
      </div>
    );
  }
}

export default DrugBatchDetails;