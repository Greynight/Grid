"use strict";

import React from 'react';
import uniqueId from 'lodash/uniqueId';

import CheckboxCell from './checkbox-cell';
import HeaderCell from './header-cell';
import BodyCell from './body-cell';
import FooterCell from './footer-cell';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      row: this.props.data
    };
  }

  getCheckboxCell = () => {
    return <CheckboxCell key={this.generateUniqueKey()} row={this} />;
  };

  getHeaderCell = (cellData, columnSchema) => {
    return <HeaderCell cellData={cellData} columnSchema={columnSchema} key={this.generateUniqueKey()} />;
  };

  getBodyCell = (cellData, columnSchema) => {
    return <BodyCell cellData={cellData} columnSchema={columnSchema} key={this.generateUniqueKey()} />;
  };

  getFooterCell = (cellData, columnSchema) => {
    return <FooterCell cellData={cellData} columnSchema={columnSchema} key={this.generateUniqueKey()} />;
  };

  getRowType = () => {
    return this.props.type;
  };

  getRowData = () => {
    return this.state.row;
  };

  getColumns = () => {
    return this.props.columns;
  };

  getSchema = () => {
    return this.props.schema;
  };

  getConfig = () => {
    return this.props.config;
  };

  isSelectionEnabled = () => {
    return this.getConfig().enableSelection;
  };

  // TODO not sure if this is the best approach index number of row/cell may be used
  generateUniqueKey = () => {
    return uniqueId('cell');
  };

  render() {
    let cells = [];

    let rowType = this.getRowType();
    let columns = this.getColumns();
    let schema = this.getSchema();
    let row = this.getRowData();

    let columnsCount = columns.length;

    let getter = `get${rowType}Cell`;

    // show checkbox column
    if (this.isSelectionEnabled()) {
      cells.push(this.getCheckboxCell());
    }

    for (let i = 0; i < columnsCount; i++) {
      let cellData = row.data[i];
      let columnSchema = schema[columns[i]];
      let cellTpl = this[getter](cellData, columnSchema);

      cells.push(cellTpl);
    }

    return (
      <div className='table-row'>
        {cells}
      </div>
    );
  }
}

export default Row;
