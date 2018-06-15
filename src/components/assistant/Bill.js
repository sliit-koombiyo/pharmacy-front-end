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
        minHeight: '297mm',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3>Precription Invoice</h3>
        <div>You Can add any component here</div>
      </div>
    </div>);
  }
}

export default Bill;