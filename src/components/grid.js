"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Rows from './rows';


class Grid extends React.Component {

  constructor(props) {
    super(props);

    // TODO maybe save all these props to 'state' object
    //this.state = {};

    // columns list
    if (!this.props.columns) {
      this.props.columns = [];
    }

    // columns structure
    if (!this.props.schema) {
      this.props.schema = {};
    }

    // data
    if (!this.props.data) {
      this.props.data = {};
    }

    if (!this.props.config || !this.props.schema) {
      throw new Error("Config or schema weren't defined");
    }
  }

  // TODO if not empty
  render = () => {
    let {...props} = this.props;

    return (
      <div className="container-fluid">
        <Rows {...props} />
      </div>);
  };

  renderGrid = () => {
    let {...props} = this.props;

    ReactDOM.render(<Grid {...props} />, document.getElementById(this.getConfig().parentId));
  };

  // TODO use setState for setters

  getConfig = () => {
    return this.props.config;
  };

  setColumns = (columns = []) => {
    this.props.columns = columns;
  };

  clearColumns = () => {
    this.props.columns.length = 0;
  };

  getColumns = () => {
    return this.props.columns;
  };

  setData = (data = {}) => {
    /*if (this.getColumns().length !== rows[0].length) {
     through new Error("Number of columns isn't equal to number of cells in a row");
     }*/
    let transformedData = {};

    let dataKeys = Object.keys(data);

    for (let rowsSection of dataKeys) {
      let transformedRows = [];
      let rows = data[rowsSection];

      for (let row of rows) {
        transformedRows.push({
          data: row,
          id: this.generateId()
        });
      }

      transformedData[rowsSection] = transformedRows;
    }

    this.props.data = Object.assign({}, transformedData);
  };

  generateId = () => {

  };



  getData = () => {
    return this.props.data;
  };

  clearData = () => {
    //this.props.data.length = 0;
  };

  isEmpty = () => {
    //return !!this.props.data.length;
  };

}

export default Grid;
