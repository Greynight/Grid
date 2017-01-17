import React from 'react';

import Cell from './cell';

class CheckboxTitleCell extends Cell {
  /*constructor(props) {
    super(props);
  }*/

  getIsAllSelected = () => {
    return this.props.isAllSelected;
  };

  onCheckboxClick = () => {
    this.props.onCheckboxAllClick();
  };

  render() {
    return <div><input type="checkbox" checked={this.getIsAllSelected()} onChange={this.onCheckboxClick} /></div>;
  }
}

export default CheckboxTitleCell;
