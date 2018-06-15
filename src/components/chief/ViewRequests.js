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


class ViewRequests extends Component {

  
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
        axios.get('https://koombiyo-pharmacy.herokuapp.com/requests').then((response) => {
            console.log(JSON.stringify("requestlist" + JSON.stringify(response.data.data)));
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
        let selected = this.state.drugs.find((request)=>{
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
            <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>View Requests</CardHeader>
              <CardBody>
                <CardTitle>Requests by Assiatant Pharmacist</CardTitle>
                <Table striped responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>RequestID</th>
                      <th>Drug Name</th>
                      <th>Requested Quantity</th>
                      <th>Available Quantity</th>
                      <th>Department</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.requests.map((element, index) => {
                        return <tr key={index}>
                          <td>{element.requestID}</td>
                          <td>{element.drugName}</td>
                          <td>{element.requestedQuantity}</td>
                          <td>{element.availableQuantity}</td>
                          <td>{element.department}</td>
                          {/* <td><Button color="link" tempdata={element._id} onClick={this.showDetails}>View</Button></td> */}
                          {/* <td><Button color="link" tempdata={element._id} onClick={this.goToUpdate}>Update</Button></td> */}
                         
                        </tr>
                      }) 
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            {/* <DrugDetails request={this.state.selectedRequest} open={this.state.modalOpen} toggle={this.toggleModal}/> */}
          
          </div>
        );
      };
    
    }

export default ViewRequests; 