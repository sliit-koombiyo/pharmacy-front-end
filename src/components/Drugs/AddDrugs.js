import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import DrugDetails from './DrugDetails';

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
          })
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

    render() {
        return (
          <div>
            <Card>
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Add Drugs</CardHeader>
              <CardBody>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="drugID">DrugID</label>
                 <input id="drugID" name="drugID" type="text" />

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
                          <td><Button color="link" tempdata={element._id} onClick={this.handleClick}>Delete</Button></td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <DrugDetails drug={this.state.selectedDrug} open={this.state.modalOpen} toggle={this.toggleModal}/>
          </div>
        );
      };
    
    }

export default AddDrugs; 