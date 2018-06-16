import React, { Component } from 'react';


class Bill extends Component {
  constructor() {
    super();
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
            return <div key={index}>{item.drug}(Rs. {item.price}) X {item.quantity}</div>
          })
        }
        <h5>Total = {this.props.billTotal}</h5>
      </div>
    </div>);
  }
}

export default Bill;