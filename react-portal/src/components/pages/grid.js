import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {makeData} from '../../utils/datagenerator';

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: makeData()
		};
	}

  render() {
  	const { data } = this.state;

    return (
      <div>
        <h1>
        	Grid
        </h1>
        
    	{/* CSS Grid*/}
		{/*<div class="wrapper">
			<div class="box a">A</div>
			<div class="box b">B</div>
			<div class="box c">C</div>
			<div class="box d">D</div>
			<div class="box e">E</div>
		</div>*/}

 		<ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </div>
    );
  }
}

export default Grid;