import React from 'react';

import Cell from './cell';

class CheckboxCell extends Cell {
  /*constructor(props) {
    super(props);
  }*/

  getRowData = () => {
    return this.props.rowData;
  };

  onCheckboxSelect = (event) => {
    this.props.onCheckboxClick(this.getRowData(), event);
  };

  render() {
    return (<div><input type="checkbox" onChange={this.onCheckboxSelect} checked={this.getRowData().isSelected} /></div>);
  }
}

export default CheckboxCell;
