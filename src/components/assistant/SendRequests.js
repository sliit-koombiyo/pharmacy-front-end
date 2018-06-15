import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Label,Input,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table,Form
} from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const DropDownFortypes =["pills","Table","Cream","Syrup"];
const defaultOption = DropDownFortypes[0];


class SendRequests extends Component {

  
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            requests:[],
            selectedRequest: {},
            modalOpen: false
        }
    }

    toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
    }

    componentDidMount(){
        axios.get('http://localhost:5000/requests').then((response) => {
            console.log(JSON.stringify("request list" + JSON.stringify(response.data.data)));
            this.setState({ requests: response.data.data})
          });
          
         
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target); // @reeshma This does not work 
        console.log("form data : " + JSON.stringify(event.target.requestID.value)) 
        // try creating an object using the above -> event.target.drugID.value
        //and pass that object to the axios post method
        
        // axios.post("http://localhost:5000/drugs",{data});
    }

    showDetails = (evt) => {
        // console.log(evt.target.getAttribute('tempdata'));
        let selected = this.state.requests.find((request)=>{
          return request._id === evt.target.getAttribute('tempdata');
        })
        this.setState({selectedRequest: selected}, ()=>{
          this.toggleModal()
       });
       
      }
      // goToUpdate= (evt) => {
      //   // console.log(evt.target.getAttribute('tempdata'));
      //   let selected = this.state.drugs.find((drug)=>{
      //     return drug._id === evt.target.getAttribute('tempdata');
      //   })
      //   this.setState({selectedDrug: selected}, ()=>{
      //     this.toggleModal()
      //  });
       
      // }

      

    render() {
        return (
          <div>
            <Card>
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>SendRequests</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit}>
               <b><Label htmlFor="requestID">Request ID</Label></b>
                 <Input id="requestID" name="requestID" type="text" placeholder="Enter Request ID here"/>
                <br></br>
                 <Label htmlFor="drugName" >Drug Name</Label>
                 <Input id="drugName" name="drugName" type="text"  placeholder="Enter Drug name here"/>
                 <br></br>
                 <Label htmlFor="requestedQuantity">Requesting Quantity</Label>
                  <Input id="requestedQuantity" name="requestedQuantity" type="text" placeholder="Enter requesting quantity here"/>
                  <br></br>
                  <Label htmlFor="availableQuantity">Available Quantity</Label>
                  <Input id="availableQuantity" name="availableQuantity" type="text" placeholder="Enter available quantity here"/>
                  <br></br>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" type="text" placeholder="Enter the relevant department here" />
                  <br></br>
                  
                <Button>Send Request</Button>
      </Form>
              </CardBody>
            
           </Card>
          </div>
        );
      };
    
    }

export default SendRequests; 