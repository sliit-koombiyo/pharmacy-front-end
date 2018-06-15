// import React, { Component } from 'react';
// import * as axios from 'axios';
// import {
//     Button,
//     Card, CardBody, CardSubtitle, CardText, CardTitle,
//     CardHeader, CardFooter, Table
// } from 'reactstrap';

// class AddDrugs extends Component {

//     constructor() {
//         super();
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.state = {
//         }
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         const data = new FormData(event.target);
//         axios.post("http://localhost:5000/drugs",{body:data});
//     }

//     render() {
//         return (
//           <div>
//             <Card>
//               <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Add Drugs</CardHeader>
//               <CardBody>
//               <form onSubmit={this.handleSubmit}>
//                 <label htmlFor="drugID">Enter DrugID</label>
//                  <input id="drugID" name="drugID" type="text" />

//                     <label htmlFor="name">Enter DrugName</label>
//                      <input id="name" name="name" type="text" />

//                     <label htmlFor="stock">Enter stock</label>
//                   <input id="stock" name="stock" type="text" />

//                   <label htmlFor="type">Enter type</label>
//                   <input id="type" name="type" type="text" />

//                   <label htmlFor="price">Enter price</label>
//                   <input id="price" name="price" type="text" />

//                    <label htmlFor="dangerlevel">Enter dangerlevel</label>
//                   <input id="dangerlevel" name="dangerlevel" type="text" />

//                   <label htmlFor="reorderLevel">Enter reorderLevel</label>
//                   <input id="reorderLevel" name="reorderLevel" type="text" />

                 

//              <button>Send data!</button>
//       </form>
//               </CardBody>
//             </Card>
//             <br />
//             <Card>
//             <CardHeader style={{ backgroundColor: '#397ed0', color: 'white' }}>Drug Dispense</CardHeader>
//               <CardBody>
//                 <CardTitle>Card</CardTitle>
//                 <Table striped responsive bordered size="sm">
//                   <thead>
//                     <tr>
//                       <th>Drug ID</th>
//                       <th>Drug Name</th>
//                       <th>Quantity</th>
                      
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                       this.state.stocks.map((element, index) => {
//                         return <tr key={index}>
//                           <td>{element.drugID}</td>
//                           <td>{element.name}</td>
//                           <td>{element.stock}</td>
                        
//                         </tr>
//                       })
//                     }
//                   </tbody>
//                 </Table>
//                 <CardSubtitle>Home subtitle</CardSubtitle>
//                 <CardText>Some quick example text to build on the card title and make up the bulk of the card's
//                   content.
//                   </CardText>
//                 <Button>Button</Button>
//               </CardBody>
//             </Card>
//           </div>
//         );
//       };
    
//     }

// export default AddDrugs; 