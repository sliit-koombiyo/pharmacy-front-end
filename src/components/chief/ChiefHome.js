import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Label,Input,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table,Form
} from 'reactstrap';
import DrugDetails from '../Drugs/DrugDetails';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const DropDownFortypes =["pills","Table","Cream","Syrup"];
const defaultOption = DropDownFortypes[0];


class ChiefHome extends Component {

  
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            drugs:[],
            selectedDrug: {},
            modalOpen: false
        }
    }

    toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
    }

    componentDidMount(){
        axios.get('http://localhost:5000/drugs').then((response) => {
            console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
            this.setState({ drugs: response.data.data})
          });
          
         
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target); // @reeshma This does not work 
        console.log("form data : " + JSON.stringify(event.target.drugID.value)) 
        // try creating an object using the above -> event.target.drugID.value
        //and pass that object to the axios post method
        
        // axios.post("http://localhost:5000/drugs",{data});
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
            <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Home</CardHeader>
              <CardBody>
                <CardTitle>Welcome </CardTitle>
                <Table striped responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>Drug ID</th>
                      <th>Drug Name</th>
                      <th>Drug Stock</th>
                      <th>Drug Type</th>
                      <th>Price</th>
                      <th>Danger Level</th> 
                      <th>ReorderLevel</th>   
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.drugs.map((element, index) => {
                        return <tr key={index}>
                          <td>{element.drugID}</td>
                          <td>{element.name}</td>
                          <td>{element.stock}</td>
                          <td>{element.type}</td>
                          <td>{element.price}</td>
                          <td>{element.dangerlevel}</td>
                          <td>{element.reorderLevel}</td>
                          <td>{element.category}</td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <br/>
            <Card>
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Place Orders</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit}>
               <b><Label htmlFor="from">From</Label></b>
                 <Input id="from" name="from" type="text" />
                <br></br>
                 <Label htmlFor="to" >To</Label>
                 <Input id="to" name="to" type="text"  />
                 <br></br>
                 <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" type="text" />
                  <br></br>
                 <Label htmlFor="content">Content</Label>
                  <Input id="content" name="content" type="text" />
                  <br></br>                   
                <Button>Place Order</Button>
                 </Form>
              </CardBody>
            </Card>

            </div>
        );
      };
    
    }

export default ChiefHome; 