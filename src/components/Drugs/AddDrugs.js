import React, { Component } from 'react';
import * as axios from 'axios';
import {
    Button,Label,Input,
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    CardHeader, CardFooter, Table,Form,ModalFooter
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
      //  this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            drugs:[],
            selectedDrug: {},
            modalOpen: false,
            newDrug :{},
            updateModelOpen:false,
            drugID:'',
            name:'',
            stock:'',
            type:'',
            price:'',
            dangerlevel:'',
            reorderLevel:''
        }
    }

    toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
    }

    toggleUpdateModel =()=>{
      this.setState({updateModelOpen:!this.state.updateModelOpen});
    }

    refreshDrugs = () => {
      axios.get('http://localhost:5000/drugs').then((response) => {
        console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
        this.setState({ drugs: response.data.data}, () => {
          console.log("Drug Page refreshed" + this.state.drugs);
        })
      })
    }

    componentDidMount(){
      this.refreshDrugs();
        // axios.get('http://localhost:5000/drugs').then((response) => {
        //     console.log(JSON.stringify("drug list" + JSON.stringify(response.data.data)));
        //     this.setState({ drugs: response.data.data})
        //     console.log(this.state.drugs);
        //   });
          
    }
    handleChange =(event)=> {
   //   this.state.toUpdate = event.target.getAttribute('tempdata');
      this.setState({[event.target.name]:event.target.value} )
      console.log(this.state.name);
  
      this.setState({newDrug:{
         drugID:this.state.drugID,
         name:this.state.name,
         stock:this.state.stock,
         type:this.state.type,
         price:this.state.price,
         dangerlevel:this.state.dangerlevel,
         reorderLevel:this.state.reorderLevel
      }
      });
    }
      handleSubmit=(event)=>{
        event.preventDefault();
        const postBody = {
          drugID:event.target.drugID.value,
          name: event.target.name.value,
          stock: event.target.stock.value,
        //  type: event.target.type.value,
          price: event.target.price.value,
          dangerlevel: event.target.dangerlevel.value,
          reorderLevel: event.target.reorderLevel.value
        }
        console.log("New Drug to add"+JSON.stringify(postBody));
        axios.post("http://localhost:5000/drugs",{data:postBody}).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err);
        });
        this.refreshDrugs();
      }

<<<<<<< HEAD
    //   AddNewDrug=(evt)=>{
=======
    AddNewDrug=(evt)=>{
>>>>>>> 65ee8d2b9631c162a802bd218dfc0075e9b323f7
    
    //   console.log(this.state.newDrug);
  
<<<<<<< HEAD
    //   axios.post('http://localhost:5000/drugs/',{body:{data:this.newDrug}}).then((res)=>{
    //     console.log(res)
    //   }).catch((err)=>{
    //     console.log(err);
    //   });
    //  // this.toggle();
    //  this.refreshDrugs();
    // }
    
=======
      axios.post('http://localhost:5000/drugs/',{body:{data:this.newDrug}}).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err);
      });
      this.toggle();
    }
      
        //const data = new FormData(event.target); // @reeshma This does not work 
       // console.log("form data : " + JSON.stringify(event.target.drugID.value)) 
    //     event.preventDefault();

    //     console.log("form data : " + JSON.stringify(event.target.name.value)) 
    //     this.state.newDrug= {
    //       drugID:event.target.drugID.value,
    //       name:event.target.name.value,
    //       stock:event.target.stock,
    //       type:event.target.type,
    //       price:event.target.price,
    //       dangerlevel:event.target.dangerlevel,
    //       reorderLevel:event.target.reorderLevel,
    //     }
    //     // try creating an object using the above -> event.target.drugID.value
    //     //and pass that object to the axiosnpm stapost method
    //     console.log("New Drug"+this.state.newDrug);
        
    //     axios.post('http://localhost:5000/Drugs', {data:this.newDrug}).then((result)=>{
    //       console.log(result);
    //     }).catch((err)=>{
    //       console.error(err)
    //     });
   // }

>>>>>>> 65ee8d2b9631c162a802bd218dfc0075e9b323f7
    showDetails = (evt) => {
        console.log(evt.target.getAttribute('tempdata'));
        
        let selected = this.state.drugs.find((drug)=>{
          console.log(drug);
          console.log(evt.target.getAttribute('tempdata'));
          console.log(drug.drugID);
          return drug.drugID == evt.target.getAttribute('tempdata');
        })
        console.log(this.selected);
        this.setState({selectedDrug: selected}, ()=>{
          this.toggleModal();
       });
       
      }
      //Working function///
      handledeleteClick= (evt)=>{
       
       let selected = this.state.drugs.find((drug)=>{
        return drug.drugID == evt.target.getAttribute('tempdata');
      });
        axios.delete("http://localhost:5000/drugs/"+selected._id).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err);
        })
        this.refreshDrugs();
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
              <Form onSubmit={this.handleSubmit}>
               <b><Label htmlFor="drugID">DrugID</Label></b>
                 <Input id="drugID" name="drugID" type="text" placeholder="Drug ID"/>
                <br></br>
                 <Label htmlFor="name" >DrugName</Label>
                 <Input id="name" name="name" type="text"  placeholder="Drug name"/>
                 <br></br>
                 <Label htmlFor="stock">stock</Label>
                  <Input id="stock" name="stock" type="text"  placeholder="stock" />
                  <br></br>
                  <Label htmlFor="type">Type</Label>
                  <Dropdown options={DropDownFortypes} onChange={this._onSelect} value={defaultOption} placeholder="Select an option"/>
                  <br></br>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="text" value={this.state.price}  placeholder="price"/>
                  <br></br>
                   <Label htmlFor="dangerlevel">Dangerlevel</Label>
                  <Input id="dangerlevel" name="dangerlevel" type="text"   placeholder="Danger Level"/>
                  <br></br>
                  <Label htmlFor="reorderLevel">ReorderLevel</Label>
                  <Input id="reorderLevel" name="reorderLevel" type="text"   placeholder="re-orderlevel"/>
                  <br></br> 
                  <Button type="Submit">Add</Button>
                   </Form>
              </CardBody>
              <ModalFooter>
            <Button color="primary" onClick={this.AddNewDrug}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
            </Card>
            <br />
            <Card id="divToPrint">
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
                          <td><Button color="link" tempdata={element.drugID} onClick={this.handledeleteClick}>Delete</Button></td>
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
            <Button onClick={this.printBill}>Generate Report</Button>
          </div>
          </div>
        );
      };
    
    }

export default AddDrugs; 
