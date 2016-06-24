"use strict";

import React from 'react';
import uniqueId from 'lodash/uniqueId';

import CheckboxTitleCell from './checkbox-title-cell';
import TitleCell from './title-cell';

class TitleRow extends React.Component {
  constructor(props) {
    super(props);
  }

  getCheckboxCell = () => {
    return <CheckboxTitleCell key="selectAll" />
  };

  getTitleCell = (columnSchema) => {
    return <TitleCell columnSchema={columnSchema} key={this.generateUniqueKey()} />
  };

  getData = () => {
    return this.props.data;
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

  generateUniqueKey = () => {
    return uniqueId('cell');
  };

  render() {
    let cells = [];

    let columns = this.getColumns();
    let schema = this.getSchema();

    let columnsCount = columns.length;

    // show checkbox column
    if (this.isSelectionEnabled()) {
      cells.push(this.getCheckboxCell());
    }

    for (let i = 0; i < columnsCount; i++) {
      let columnSchema = schema[columns[i]];
      let cellTpl = this.getTitleCell(columnSchema);

      cells.push(cellTpl);
    }

    return (
      <div className='table-row header'>
        {cells}
      </div>
    );
  }
}

export default TitleRow;
