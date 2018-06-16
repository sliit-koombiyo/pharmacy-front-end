import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Label,Input,
    Card, CardBody, CardTitle,
    CardHeader, Table,Form,
} from 'reactstrap';
import * as html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DrugDetails from './DrugDetails';
import UpdateDrugs from './UpdateDrugs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const DropDownFortypes =["pills","Table","Cream","Syrup"];
const defaultOption = DropDownFortypes[0];



class AddDrugs extends Component {

  
    constructor() {
        super();
      
        this.state = {
            drugs:[],
            selectedDrug: {},
            modalOpen: false,
            newDrug :{},
            updateModelOpen:false,
            type:"",
            option :DropDownFortypes[0]
            // drugID:'',
            // name:'',
            // stock:'',
            // type:'',
            // price:'',
            // dangerlevel:'',
            // reorderLevel:''
        }
    }
    
    refreshDrugs = () => {
      axios.get('https://koombiyo-pharmacy.herokuapp.com/drugs').then((response) => {
        this.setState({ drugs: response.data.data}, () => {
          console.log("Drug Page refreshed" );
        })
      })
    }
    componentDidMount(){
      // set the access token for every request
    axios.defaults.headers.common = {
      "x-pharmacy-accesstoken":  localStorage.xPharmacyToken
    };
      this.refreshDrugs();
    }

    toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
    }

    toggleUpdateModel =()=>{
      this.setState({updateModelOpen:!this.state.updateModelOpen});
    }

    handleChange = (event)=>{
      this.setState({[event.target.name]:event.target.value} )
    }
   

    
      handleSubmit=(event)=>{
        event.preventDefault();
        const data = {
          drugID:event.target.drugID.value,
          name: event.target.name.value,
          stock: event.target.stock.value,
         // type: event.target.type.Dropdown.value,
          price: event.target.price.value,
          dangerlevel: event.target.dangerlevel.value,
          reorderLevel: event.target.reorderLevel.value
        }
        console.log("New Drug to add"+JSON.stringify(data));
        axios.post("https://koombiyo-pharmacy.herokuapp.com/drugs/",data).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err);
        });
        {document.getElementById('AddDrugForm').reset()}
        this.refreshDrugs();
        this.componentDidMount();
      }

   
    showDetails = (evt) => {
        console.log(evt.target.getAttribute('tempdata'));
        
        let selected = this.state.drugs.find((drug)=>{
          return drug.drugID == evt.target.getAttribute('tempdata');
        })
        
        this.setState({selectedDrug: selected}, ()=>{
          this.toggleModal();
       });
       
      }
      //Working function///
      handledeleteClick= (evt)=>{
       
       let selected = this.state.drugs.find((drug)=>{
        return drug._id == evt.target.getAttribute('tempdata');
      });
      console.log(selected._id);
        axios.delete("https://koombiyo-pharmacy.herokuapp.com/drugs/"+selected._id).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err);
        })
       // this.refreshDrugs();
       this.componentDidMount();
      };
    //----------------------///

      goToUpdate= (evt) => {
        // console.log(evt.target.getAttribute('tempdata'));
        let selected = this.state.drugs.find((drug)=>{
          return drug.drugID == evt.target.getAttribute('tempdata');
        })
        this.setState({selectedDrug: selected}, ()=>{
          this.toggleUpdateModel()
       });
       
      }

      generateReport = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("bill.pdf");
          });
      }
    

    render() {
        return (
          <div>
            <Card  className="addCardContainer">
              <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Add Drugs</CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit} id ="AddDrugForm">
               <b><Label htmlFor="drugID">DrugID</Label></b>
                 <Input id="drugID" name="drugID" type="text" placeholder="Drug ID"/>
                <br></br>
                <b> <Label htmlFor="name" >DrugName</Label></b>
                 <Input id="name" name="name" type="text"  placeholder="Drug name"/>
                 <br></br>
                <b> <Label htmlFor="stock">stock</Label></b>
                  <Input id="stock" name="stock" type="text"  placeholder="stock" />
                  <br></br>
                  {/* <Label htmlFor="type">Type</Label>
                  <Dropdown  name ="type" options={DropDownFortypes} onChange={this.handleChange} value={defaultOption} placeholder="Select an option"/>
                  <br></br> */}
                  <b><Label htmlFor="price">Price</Label></b>
                  <Input id="price" name="price" type="text"  placeholder="price"/>
                  <br></br>
                   <b><Label htmlFor="dangerlevel">Dangerlevel</Label></b>
                  <Input id="dangerlevel" name="dangerlevel" type="text"   placeholder="Danger Level"/>
                  <br></br>
                  <b><Label htmlFor="reorderLevel">ReorderLevel</Label></b>
                  <Input id="reorderLevel" name="reorderLevel" type="text"   placeholder="re-orderlevel"/>
                  <br></br> 
                  <Button type="Submit" color="primary">Add</Button>
                  {/* <Button color="secondary" onClick={document.getElementById("AddDrugForm").reset()}>Cancel</Button> */}
                   </Form>
              </CardBody>
            </Card>
            <br />
            <Card id="divToPrint">
            <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drugs</CardHeader>
              <CardBody>
                <CardTitle>Drugs</CardTitle>
                <Table striped responsive bordered size="sm">
                  <thead>
                    <tr>
                      <th>Drug ID</th>
                      <th>Drug Name</th>
                      <th>Quantity</th>
                      <th></th>
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
                          <td><Button color="link" tempdata={element.drugID} onClick={this.showDetails}>View</Button></td>
                          <td><Button color="link" tempdata={element.drugID} onClick={this.goToUpdate}>Update</Button></td>
                          <td><Button color="link" tempdata={element._id} onClick={this.handledeleteClick}>Delete</Button></td>
                        </tr>
                      }) 
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <DrugDetails drug={this.state.selectedDrug} open={this.state.modalOpen} toggle={this.toggleModal}  refreshDrugs={this.refreshDrugs}/>
            <UpdateDrugs drug ={this.state.selectedDrug} open = {this.state.updateModelOpen} toggle={this.toggleUpdateModel}  refreshDrugs={this.refreshDrugs}/>
            <div className="Button">
            <br></br>
            <Button onClick={this.generateReport}>Generate Report</Button>
          </div>
          </div>
        );
      };
    
    }

export default AddDrugs; 
