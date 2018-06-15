import React, { Component } from 'react';
import * as html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class Report  extends Component {
    constructor() {
      super();
    }

    printReport = () => {
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
        return (<div>
          <div className="mb5">
            <button onClick={this.printBill}>Generate Report</button>
          </div>
          <div id="divToPrint" className="mt4" style={{
            padding: 5,
            backgroundColor: '#f5f5f5',
            width: '210mm',
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