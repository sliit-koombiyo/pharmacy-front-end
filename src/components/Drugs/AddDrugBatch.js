import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Form,Label,Input,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import DrugBatchDetails from './DrugBatchDetails';
import UpdateDrugs from './UpdateDrugs';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddDrugBatch extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            drugbatchs:[],
            selectedBatch: {},
            modalOpen: false,
            drugs:[],
            date:moment()
            
        };
    }

    toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
    }

    refreshDrugsBatch = () => {
      axios.get('https://koombiyo-pharmacy.herokuapp.com/drugsBatch').then((response) => {
        console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
        this.setState({ drugbatchs: response.data.data}, () => {
          console.log("Drug Page refreshed" + this.state.drugbatch);
        })
      })
    }

    componentDidMount(){
       this.refreshDrugsBatch();
      
    }
    handleSubmit=(event)=>{
      event.preventDefault();
      const data = {
        batchID:event.target.batchID.value,
        drugID: event.target.drugID.value,
        expiryDate: this.state.date,
        batchQuntity: event.target.batchQuntity.value
      }
      console.log("New Drug to add"+JSON.stringify(data));
      axios.post("https://koombiyo-pharmacy.herokuapp.com/drugsBatch",{data}).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      });
      {document.getElementById('add-batch-form').reset()}
      this.refreshDrugsBatch();
      this.componentDidMount();
    }


    showDetails = (evt) => {
        console.log(evt.target.getAttribute('tempdata'));
        let selected = this.state.drugs.find((drugBatch)=>{
          return drugBatch.batchID == evt.target.getAttribute('tempdata');
        })
        
        console.log("Selet"+JSON.stringify(selected));

        this.setState({selectedBatch: selected}, ()=>{
          console.log("Selected drug batch"+this.selectedBatch);
          this.toggleModal();
       });
       
      }
      // goToUpdate= (evt) => {
      //   // console.log(evt.target.getAttribute('tempdata'));
      //   let selected = this.state.drugbatchs.find((drugBatch)=>{
      //     return drugBatch._id === evt.target.getAttribute('tempdata');
      //   })
      //   this.setState({selectedDrugBatch: selected}, ()=>{
      //     this.toggleModal()
      //  });
       
      // }
      
  handleDateChangeChange(evt) {
    console.log(evt);
    this.setState({
      date: evt
    });
  }

  handledeleteClick= (evt)=>{
       
    let selected = this.state.drugbatchs.find((drugBatch)=>{
     return drugBatch._id == evt.target.getAttribute('tempdata');
   });
     axios.delete("https://koombiyo-pharmacy.herokuapp.com/drugsBatch/"+selected._id).then((res)=>{
       console.log(res)
     }).catch((err)=>{
       console.log(err);
     })
     this.refreshDrugsBatch();
   };

    render() {
        return (
          <div>
            <Card className="addCardContainer">
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Add Drug Batch</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit} id="add-batch-form">
                <b><Label htmlFor="batchID">Batch ID</Label></b>
                 <Input id="batchID" name="batchID" type="text" />
                  <br></br>
                 <b><Label htmlFor="drugID">drugID</Label></b>
                 <Input id="drugID" name="drugID" type="text" />
                 <br></br>
                 <b><Label htmlFor="expiryDate">ExpiryDate</Label></b>
                 <DatePicker  selected={this.state.date} onChange={this.handleDateChange}/>
                  <br></br>
                  <b><Label htmlFor="batchQuntit   y">Batch Quantity</Label></b>
                  <Input id="batchQuntity" name="batchQuntity" type="text" />
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
                      <th>Drug ID</th>
                      <th>Expiry Date</th>
                      <th>Batch Quntity</th>
                      <th></th>
                      <th></th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.drugbatchs.map((element, index) => {
                        return <tr key={index}>
                          <td>{element.batchID}</td>
                          <td>{element.drugID}</td> 
                          <td>{element.expiryDate}</td> 
                          {/* <td>{element.expiryDate.substring(element.expiryDate,element.expiryDate.length-14)}</td> */}
                          <td>{element.batchQuntity}</td>
                          {/* <td><Button color="link" tempdata={element.batchID} onClick={this.showDetails}>View</Button></td> */}
                          {/* <td><Button color="link" tempdata={element.batchID} onClick={this.goToUpdate}>Update</Button></td> */}
                          <td><Button color="link" tempdata={element._id} onClick={this.handledeleteClick}>Delete</Button></td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <DrugBatchDetails drug={this.state.selectedBatch} open={this.state.modalOpen} toggle={this.toggleModal}/>
            {/* <UpdateDrugs drug ={this.state.selectedDrug} open = {this.state.modalOpen} toggle={this.toggleModal}/> */}
          </div>
        );
      };
    
    }

export default AddDrugBatch; 