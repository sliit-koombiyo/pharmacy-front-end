import React, { Component } from 'react';
import { Button,Label,Input,Modal, ModalHeader, ModalBody, ModalFooter,Form,Text} from 'reactstrap';
import Axios from 'axios';
// import {
//   Label,Button,Form,Input,Modal
// } from 'reactstrap';

class UpdateDrug extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }
  

  toggle() {
    this.props.toggle()
  } 

  refreshDrugs(){
    this.props.refreshDrugs();
  }

  componentDidMount(){
    this.refreshDrugs();
  }

  // handleChange =(event)=> {
  //   this.state.toUpdate = event.target.getAttribute('tempdata');
  //   this.setState({[event.target.name]:event.target.value} )
  //   console.log(this.state.name);

  //   this.setState({updatedDrug:{
  //      name:this.state.name,
  //      stock:this.state.stock,
  //      type:this.state.type,
  //      price:this.state.price,
  //      dangerlevel:this.state.dangerlevel,
  //      reorderLevel:this.state.reorderLevel
       
  //   }
  //   });
  // }
  handleSubmit=(event)=>{
       
        event.preventDefault();
        const postBody = {
        drugID:event.target.drugID.value,
        name: event.target.name.value,
        stock: event.target.stock.value,
        type: event.target.type.value,
        price: event.target.price.value,
        dangerlevel: event.target.dangerlevel.value, 
    }

    const toUpdate = event.target.getAttribute('tempdata'); 
    console.log("ID to update : " + JSON.stringify(event.target.drugID.value));
    console.log("form data : " + JSON.stringify(postBody ));
    Axios.post('http://localhost:5000/drugs/'+event.target.drugID.value,{postBody}).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err);
        });
        console.log("delete id"+ this.props.drug._id);
      Axios.delete('http://localhost:5000/drugs/'+this.props.drug._id).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      }) ;
        this.toggle();
        this.refreshDrugs();
        this.componentDidMount();
  }
  
  // UpdateDrug=(evt)=>{
  //   const toUpdate = evt.target.getAttribute('tempdata');
  //   console.log(this.state.updatedDrug);
  //   console.log("ID to update" +toUpdate);

  //   Axios.post('http://localhost:5000/drugs/'+toUpdate,{params:{id:this.state.toUpdate},body:{data:this.updatedDrug}}).then((res)=>{
  //     console.log(res)
  //   }).catch((err)=>{
  //     console.log(err);
  //   });
  //   this.toggle();
  // }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>Drug : {this.props.drug.name}</ModalHeader>
          <ModalBody>
            {
                <Form onSubmit={this.handleSubmit}>
                <span id="_id" name ="_id" value={this.props.drug._id}></span>
                <Label htmlFor="drugID">Drug ID  :</Label>{"    "}
                <Label htmlFor="drugID">{this.props.drug.drugID}</Label>
                <Input id="drugID" name="drugID" type="text" value={this.props.drug.drugID}  placeholder={this.props.drug.drugID} disabled />
                <br></br>

                 <Label htmlFor="name">DrugName</Label>
                 <Input id="name" name="name" type="text" placeholder={this.props.drug.name} />

                 <Label htmlFor="stock">stock</Label>
                  <Input id="stock" name="stock" type="text"  placeholder={this.props.drug.stock}/>

                  <Label htmlFor="type">Type</Label>
                  <Input id="type" name="type" type="text"  placeholder={this.props.drug.type} />

                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="text"  placeholder={this.props.drug.price} />

                   <Label htmlFor="dangerlevel">Dangerlevel</Label>
                  <Input id="dangerlevel" name="dangerlevel" type="text"  placeholder={this.props.drug.dangerlevel}/>

                  <Label htmlFor="reorderLevel">ReorderLevel</Label>
                  <Input id="reorderLevel" name="reorderLevel" type="text"  placeholder={this.props.drug.reorderLevel}/>
                  <Button type="submit" value="Update" tempdata={this.props.drug._id}>Update</Button>
                  </Form>
                }
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" tempdata={this.props.drug.drugID} onClick={this.UpdateDrug}>Update</Button>{' '} */}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateDrug;