import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Form,Label,Input,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import DrugDetails from './DrugDetails';
import UpdateDrugs from './UpdateDrugs';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddDrugBatch extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            drugbatch:[],
            selectedDrug: {},
            modalOpen: false,
            drugs:[],
            date:moment()
            
        };
    }

    toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
    }

    componentDidMount(){
        axios.get('http://localhost:5000/DrugBatch').then((response) => {
            console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
            this.setState({ drugsbatch: response.data.data})
          });

          axios.get('http://localhost:5000/Drug').then((response) => {
            console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
            this.setState({ drugs: response.data.data})
          });
    }
    // DropDownforItemID=()=>{
    //   let drugIds = [];
    //   for( let i = 0; i <= this.drugs; i++) {
    //     drugIds.push(<option key={i} value={this.drugs[i].id}></option>);
    //     console.log(drugIds);
    //   }
    //   return drugIds;
    // }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        axios.post("http://localhost:5000/drugBatch",{body:data});
    }

    showDetails = (evt) => {
        // console.log(evt.target.getAttribute('tempdata'));
        let selected = this.state.drugs.find((drug)=>{
          return drug._id === evt.target.getAttribute('tempdata');
        })
        this.setState({selectedDrug: selected}, ()=>{
          this.toggleModal()
       });
       
      }
      goToUpdate= (evt) => {
        // console.log(evt.target.getAttribute('tempdata'));
        let selected = this.state.drugs.find((drug)=>{
          return drug._id === evt.target.getAttribute('tempdata');
        })
        this.setState({selectedDrug: selected}, ()=>{
          this.toggleModal()
       });
       
      }
      
  handleDateChangeChange(evt) {
    console.log(evt);
    this.setState({
      date: evt
    });
  }

    render() {
        return (
          <div>
            <Card>
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Add Drug Batch</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <Label htmlFor="batchID">Batch ID</Label>
                 <Input id="batchID" name="batchID" type="text" />
                  <br></br>
                 <Label htmlFor="name">DrugName</Label>
                 <Input id="name" name="name" type="text" />
                 <br></br>
                 <Label htmlFor="expiryDate">ExpiryDate</Label>
                 <DatePicker  selected={this.state.date} onChange={this.handleDateChange}/>
                  <br></br>
                  <Label htmlFor="batchQuntit   y">Batch Quantity</Label>
                  <Input id="batchQuntity" name="batchQuntity" type="text" />
                  
                   {/* <input type="select" onChange={this.onDropdownSelected} label="Multiple Select" multiple>
                        {this.DropDownforItemID()}
                    </input> */}
                    <br></br>
                <Button>Add</Button>
      </Form>
              </CardBody>
            </Card>
            <br />
            <Card>
            <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drug Batchs</CardHeader>
              <CardBody>
                <CardTitle>Card</CardTitle>
                <Table striped responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>Batch ID</th>
                      <th>Drug Name</th>
                      <th>ExpiryDate</th>
                      <th></th>
                      <th></th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.drugbatch.map((element, index) => {
                        return <tr key={index}>
                          <td>{element.drugID}</td>
                          <td>{element.name}</td>
                          <td>{element.stock}</td>
                          <td><Button color="link" tempdata={element._id} onClick={this.showDetails}>View</Button></td>
                          <td><Button color="link" tempdata={element._id} onClick={this.goToUpdate}>Update</Button></td>
                          <td><Button color="link" tempdata={element._id} onClick={this.handleClick}>Delete</Button></td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <DrugDetails drug={this.state.selectedDrug} open={this.state.modalOpen} toggle={this.toggleModal}/>
            {/* <UpdateDrugs drug ={this.state.selectedDrug} open = {this.state.modalOpen} toggle={this.toggleModal}/> */}
          </div>
        );
      };
    
    }

export default AddDrugBatch; 