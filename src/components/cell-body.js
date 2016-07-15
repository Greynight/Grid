"use strict";

import Cell from './cell';
import Templates from './templates';

class BodyCell extends Cell {
  constructor(props) {
    super(props);
  }

  getCellId = () => {
    return this.props.cellId;
  };

  getCellNum = (cellId) => {
    let cellIdParts = cellId.split('-');

    return cellIdParts[2];
  };

  onValueChange = (evt) => {
    let newValue = evt.target.value;
    let cellNum = this.getCellNum(this.getCellId());

    this.props.onCellChange(cellNum, newValue);
  };

  render() {
    this.columnsTemplates = new Templates({
      data: this.getCellData(),
      onValueChange: this.onValueChange,
      styles: this.styles
    });

    return this.state.template();
  }
}

export default BodyCell;
