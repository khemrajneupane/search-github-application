import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listItems: [], search: '' };
  }

  submitSearch = () => {
    fetch('https://api.github.com/search/repositories?q=' + this.state.search)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          listItems: responseData.items,
        });
      });
  }
  inputChanged = (event) => {
    this.setState({
      search: event.target.value
    });
  };
  render() {


    return (
      <div>
        <h1 style={{textAlign:"center",color:"blue"}}>Github Repository Search</h1>
        <input type="text" value={this.state.search} onChange={this.inputChanged} />
        <Button className = "btn btn-primary" onClick={this.submitSearch}>Press me</Button>
        <ReactTable
          data={this.state.listItems}
          columns={[
            {
              Header: "Description",
              accessor: "name",
            },
            {
              Header: "URls",
              accessor: "html_url",
              Cell: e => <div>{e.value}<Button className="btn btn-info"><a href={e.value} style={{textDecoration:"none",fontSize:20}} target="-blank"> Click </a></Button></div>
              
            }

          ]}


        />
      </div>
    );

  }
  
}

export default App;
