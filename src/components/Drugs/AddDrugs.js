import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Label,Input,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table,Form
} from 'reactstrap';
import DrugDetails from './DrugDetails';
import UpdateDrugs from './UpdateDrugs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const DropDownFortypes =["pills","Table","Cream","Syrup"];
const defaultOption = DropDownFortypes[0];


class AddDrugs extends Component {

  
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
        console.log("form data : " + JSON.stringify(event.target.Name.value)) 
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
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Add Drugs</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit}>
               <b><Label htmlFor="drugID">DrugID</Label></b>
                 <Input id="drugID" name="drugID" type="text" placeholder="Drug ID"/>
                <br></br>
                 <Label htmlFor="name" >DrugName</Label>
                 <Input id="name" name="name" type="text"  placeholder="Drug name"/>
                 <br></br>
                 <Label htmlFor="stock">stock</Label>
                  <Input id="stock" name="stock" type="text" placeholder="stock"/>
                  <br></br>
                  <Label htmlFor="type">Type</Label>
                  <Dropdown options={DropDownFortypes} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                  <br></br>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="text" placeholder="price" />
                  <br></br>
                   <Label htmlFor="dangerlevel">Dangerlevel</Label>
                  <Input id="dangerlevel" name="dangerlevel" type="text" placeholder="Danger Level" />
                  <br></br>
                  <Label htmlFor="reorderLevel">ReorderLevel</Label>
                  <Input id="reorderLevel" name="reorderLevel" type="text" placeholder="re Orderlevel" />
                  <br></br> 
                <Button>Add</Button>
      </Form>
              </CardBody>
            </Card>
            <br />
            <Card>
            <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drugs</CardHeader>
              <CardBody>
                <CardTitle>Card</CardTitle>
                <Table striped responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>Drug ID</th>
                      <th>Drug Name</th>
                      <th>Quantity</th>
                      <th></th>
                      <th></th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.drugs.map((element, index) => {
                        return <tr key={index}>
                          <td>{element.drugID}</td>
                          <td>{element.name}</td>
                          <td>{element.stock}</td>
                          <td><Button color="link" tempdata={element._id} onClick={this.showDetails}>View</Button></td>
                          {/* <td><Button color="link" tempdata={element._id} onClick={this.goToUpdate}>Update</Button></td> */}
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

export default AddDrugs; 