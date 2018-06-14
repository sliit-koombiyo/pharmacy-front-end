import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import Axios from 'axios';

class UpdateDrug extends Component {
  constructor(props) {
    super(props);
    drug:{}

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle()
  }
  UpdateDrug=(evt)=>{
    console.log(evt.target.getAttribute('tempdata'));
    const toUpdate = evt.target.getAttribute('tempdata');
    const name = evt.target.getAttribute('name');
    console.log(name);
    Axios.post('http://localhost/drugs/',{params:{id:toUpdate},body:{data:this.drug}}).then((res)=>{
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
          <ModalHeader toggle={this.toggle}>Prescription : {this.props.name}</ModalHeader>
          <ModalBody>
            {
                <form onSubmit={this.UpdateDrug}>
                <label htmlFor="drugID">this.props.drugID</label>

                 <label htmlFor="name">DrugName</label>
                 <input id="name" name="name" type="text" />

                 <label htmlFor="stock">stock</label>
                  <input id="stock" name="stock" type="text" />

                  <label htmlFor="type">Type</label>
                  <input id="type" name="type" type="text" />

                  <label htmlFor="price">Price</label>
                  <input id="price" name="price" type="text" />

                   <label htmlFor="dangerlevel">Dangerlevel</label>
                  <input id="dangerlevel" name="dangerlevel" type="text" />

                  <label htmlFor="reorderLevel">ReorderLevel</label>
                  <input id="reorderLevel" name="reorderLevel" type="text" />
                <button>Add</button>
                    </form>
                }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" tempdata={this.props.drug._id} onClick={this.DeleteDrug}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateDrug;