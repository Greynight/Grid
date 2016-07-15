"use strict";

import React from 'react';

import Cell from './cell';

class TitleCell extends Cell {
  constructor(props) {
    super(props);
  }

  getOrderDir = () => {
    return this.props.orderDir;
  };

  onHeaderClick = () => {
    if (this.isColumnSortable()) {
      let columnId = this.getColumnId();

      this.props.onSortClick(columnId);
    }
  };

  isColumnSortable = () => {
    return this.getSchema().isSortable;
  };

  render() {
    let className = '';
    let cellData = this.getSchema();

    if (this.isColumnSortable()) {
      className += 'sort ' + this.getOrderDir();
    }

    return (
      <div className = {className} onClick = {this.onHeaderClick}>
        {cellData.title}
      </div>
    );
  }
}

export default TitleCell;
