import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Label,Input,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table,Form
} from 'reactstrap';
import GRNDetails from './GRNDetails';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const DropDownFortypes =["pills","Table","Cream","Syrup"];
const defaultOption = DropDownFortypes[0];



class ManageGRN extends Component {

  
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            grns:[],
            selectedGRN: {},
            modalOpen: false
        }
    }

    toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
    }
      refreshDrugs = () => {
        axios.get('https://koombiyo-pharmacy.herokuapp.com/grn').then((response) => {
          console.log(JSON.stringify("grn list" + JSON.stringify(response.data.data)));
          this.setState({ grns: response.data.data})
        });
        
    }

    componentDidMount(){
      // set the access token for every request
    axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };
        // axios.get('https://koombiyo-pharmacy.herokuapp.com/grn').then((response) => {
        //     console.log(JSON.stringify("grn list" + JSON.stringify(response.data.data)));
        //     this.setState({ grns: response.data.data})
        //   });
        this.refreshDrugs();
          
         
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target); // @reeshma This does not work 
        console.log("form data : " + JSON.stringify(event.target.noteID.value))
        const postBody = {
          noteID: event.target.noteID.value,
          supplier: event.target.supplier.value,
          orderQuantity: event.target.orderQuantity.value,
          deliveredQuantity: event.target.deliveredQuantity.value,
          amount: event.target.amount.value
        } 
        console.log("form data : " + JSON.stringify(postBody))
        // try creating an object using the above -> event.target.drugID.value
        //and pass that object to the axios post method
        axios.post("https://koombiyo-pharmacy.herokuapp.com/grn",postBody).then(result=>{
          axios.get('https://koombiyo-pharmacy.herokuapp.com/grn').then((response) => {
            console.log(JSON.stringify("grn list" + JSON.stringify(response.data.data)));
            this.setState({ grns: response.data.data})
          });
        }).catch(err=>{
          console.log(err.message);
        });
        this.refreshDrugs();
        this.componentDidMount();
    }

    showDetails = (evt) => {
        // console.log(evt.target.getAttribute('tempdata'));
        let selected = this.state.grns.find((grn)=>{
          return grn._id === evt.target.getAttribute('tempdata');
        })
        this.setState({selectedGRN: selected}, ()=>{
          this.toggleModal()
       });
      }
        handledeleteClick= (evt)=>{
       
       let selected = this.state.grns.find((grn)=>{
        return grn._id == evt.target.getAttribute('tempdata');
      });
       console.log("Selected object"+JSON.stringify(selected));
        axios.delete("https://koombiyo-pharmacy.herokuapp.com/grn/"+selected._id).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err);
        })
        this.refreshDrugs();
        this.componentDidMount();
      };
      

    render() {
        return (
          <div>
            <Card>
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Add Good Received Notes</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit}>
               <b><Label htmlFor="noteID">Note ID</Label></b>
                 <Input id="noteID" name="noteID" type="text" placeholder="Enter Note ID here"/>
                <br></br>
                 <Label htmlFor="supplier" >Supplier Name</Label>
                 <Input id="supplier" name="supplier" type="text"  placeholder="Enter Supplier name here"/>
                 <br></br>
                 <Label htmlFor="orderQuantity">Ordered Quantity</Label>
                  <Input id="orderQuantity" name="orderQuantity" type="text" placeholder="Enter Ordered Quantity here"/>
                  <br></br>
                  <Label htmlFor="deliveredQuantity">Delivered Quantity</Label>
                  <Input id="deliveredQuantity" name="deliveredQuantity" type="text" placeholder="Enter Delivered Quantity here"/>
                  <br></br>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" name="amount" type="text" placeholder="Enter Amount here" />
                  <br></br>
                  <input type="submit" value="Add"/>

      </Form>
              </CardBody>
            </Card>
            <br />
            <Card>
            <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Good Received Notes</CardHeader>
              <CardBody>
                <CardTitle></CardTitle>
                <Table striped responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>Note ID</th>
                      <th>Supplier Name</th>
                      <th>Ordered Quantity</th>
                      <th>Delivered Quantity</th>
                      <th>Amount</th>
                      <th></th>
                      <th></th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.grns.map((element, index) => {
                        return <tr key={index}>
                          <td>{element.noteID}</td>
                          <td>{element.supplier}</td>
                          <td>{element.orderQuantity}</td>
                          <td>{element.deliveredQuantity}</td>
                          <td>{element.amount}</td>
                          <td><Button color="link" tempdata={element._id} onClick={this.showDetails}>View</Button></td>
                          {/* <td><Button color="link" tempdata={element._id} onClick={this.goToUpdate}>Update</Button></td> */}
                          <td><Button color="link" tempdata={element._id} onClick={this.handledeleteClick}>Delete</Button></td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <GRNDetails grn={this.state.selectedGRN} open={this.state.modalOpen} toggle={this.toggleModal}/>
            {/* <UpdateDrugs drug ={this.state.selectedDrug} open = {this.state.modalOpen} toggle={this.toggleModal}/> */}
          </div>
        );
      };
    
    }

export default ManageGRN; 