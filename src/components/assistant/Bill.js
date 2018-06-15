import React, { Component } from 'react';
import Axios from 'axios';



class Bill extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

    this.props.prescription.prescriptionItems.map((item, index)=>{
      return <div key={index}>{item.drug} + {item.quantity}</div>
    })
    const postData = {
      patient: this.props.prescription.patientName,
      items: [
        {name: "Salbutamol", quantity: 2, price: 200},
        {name: "buscopan", quantity: 2, price: 100}
      ]
    }

    Axios.post('http://localhost:8080/billing', postData).then((result)=>{
      console.log("BILL result : " + JSON.stringify(result))
    }).catch(err=>{
      console.error(err)
    })
  }

  render() {
    return (<div>
      <div id="divToPrint" className="mt4" style={{
        padding: 5,
        backgroundColor: '#f5f5f5',
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3>Precription Invoice</h3>
        <div><b>Patient</b> : {this.props.prescription.patientName}</div>
        <div><b>Prescription ID</b> : {this.props.prescription._id}</div>
        <div><b>Created at</b> : {this.props.prescription.createdAt}</div>
        <hr/>
        <h4>Precription Items</h4>
        {
          this.props.prescription.prescriptionItems.map((item, index)=>{
            return <div key={index}>{item.drug} + {item.quantity}</div>
          })
        }
        <h5>Total = {this.props.billTotal}</h5>
      </div>
    </div>);
  }
}

export default Bill;