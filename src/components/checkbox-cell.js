"use strict";

import React from 'react';

class CheckboxCell extends React.Component {
  constructor(props) {
    super(props);

    this.grid = this.props.grid;
    this.row = this.props.row;
    this.isEmptyCell = this.props.isEmptyCell;

    this.state = {
      isSelected: this.isSelected()
    }
  }



  onCheckboxClick = (evt) => {
    let row = this.getRow();

    this.grid.toggleRowSelection(row, evt);
  };

  componentWillReceiveProps = (nextProps) => {
    let row = nextProps.row;
    let rowData = row.getRowData();
    console.log(rowData);
    let isDataChanged = this.state.isSelected !== rowData.isSelected;

    if (isDataChanged) {
      this.setState({
        isSelected: rowData.isSelected
      });
    }
  };

  getRow = () => {
    return this.row.getRowData();
  };

  isSelected = () => {
    let row = this.getRow();

    return row.isSelected;
  };

  render() {
    let template = undefined;

    if (this.isEmptyCell) {
      template = <div></div>;
    } else {
      template = <div><input type="checkbox" onChange={this.onCheckboxClick} checked={this.state.isSelected} /></div>;
    }

    return template;
  }
}

export default CheckboxCell;
