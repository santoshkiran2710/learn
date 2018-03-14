import React, { Component } from 'react';
// component and styles
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

import ReactTable from 'react-table';
import "react-table/react-table.css";


const CHART_DATA = {
  columns: [
    ['data1', 30, 20, 50, 40, 60, 50],
    ['data2', 200, 130, 90, 240, 130, 220],
    ['data3', 300, 200, 160, 400, 250, 250]
  ],
  type: 'bar'
};


class Graphs extends Component {
  
  render() {
    const data = [{
          hcp: 'TOTAL CARE ME',
          enrollees: "40%",
          total: "510,000"
        },
        {
          hcp: 'IIIinicare Health',
          enrollees: "16%",
          total: "200,000"
        },
        {
          hcp: 'Meridian Health',
          enrollees: "20%",
          total: "250,000"
        },
        {
          hcp: 'Molina',
          enrollees: "8%",
          total: "100,000"
        },
        {
          hcp: 'County Care',
          enrollees: "8%",
          total: "100,000"
        },
        {
          hcp: 'Harmony Health Plan',
          enrollees: "5%",
          total: "58,000"
        },
        {
          hcp: 'BCBS',
          enrollees: "4%",
          total: "50,000"
        },
        {
          hcp: 'TOTAL',
          enrollees: "100%",
          total: "1,268,000"
        },
        {
    }]
    return (
      <div style={styles.root}>
        <h3>
        Graphs
        </h3>
        <p>
        <BillboardChart data={CHART_DATA}/>
        </p>
        <ReactTable style={styles.hcptable}
          data={data}
          columns={[
            {
              /*Header: "Health Care Plus",*/
              columns: [
                {
                  Header: "Healthcare Plus",
                  accessor: "hcp"
                }
              ]
            },
            {
              /*Header: "% of Enrollees",*/
              columns: [
                {
                  Header: "% of Enrollees",
                  accessor: "enrollees"
                }
              ]
            },
            {
              /*Header: 'Total Enrollees',*/
              columns: [
                {
                  Header: "Total Enrollees",
                  accessor: "total"
                }
              ]
            }
          ]}
          /*defaultPageSize={10}
          className="-striped -highlight"*/
        />
      </div>
    );
  }
}
var styles = {
  root: {
    display: "block",
    float: "left",
    width: "1200px",
    height: "1700px"
  },
  hcptable: {
    display: "block",
    float: "left",
    height: "50px",
    width: "500px"
  }
}
export default Graphs;