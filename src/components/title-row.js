"use strict";

import React from 'react';
import uniqueId from 'lodash/uniqueId';

import CheckboxTitleCell from './checkbox-title-cell';
import TitleCell from './title-cell';
import ActionsCell from './actions';

// TODO extend body-row and title-row from some abstract row
class TitleRow extends React.Component {
  constructor(props) {
    super(props);
  }

  getCheckboxCell = () => {
    return (
      <td key="selectAll">
        <CheckboxTitleCell grid={this.getGridInstance()} />
      </td>
    );
  };

  getTitleCell = (columnSchema) => {
    return (
      <th key={this.generateUniqueKey()}>
        <TitleCell columnSchema={columnSchema} />
      </th>
    );
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

  isEditingEnabled = () => {
    return this.getConfig().enableEditing;
  };

  getActionsCell = (actionId, isEmptyCell) => {
    return (
      <td key={this.createColumnKey(actionId)}>
        <ActionsCell
          key={actionId}
          isEmptyCell={isEmptyCell}
          row={this} />
      </td>
    );
  };

  createUniqueActionCellId = (rowId) => {
    return `action-${rowId}`;
  };

  createColumnKey = (cellId) => {
    return `td-${cellId}`;
  };

  getGridInstance = () => {
    return this.props.grid;
  };


  render() {
    console.log("render title row");
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

    if (this.isEditingEnabled()) {
      let isEmptyCell = true;
      let actionCellId = this.createUniqueActionCellId('action-title');

      cells.push(this.getActionsCell(actionCellId, isEmptyCell));
    }

    /*return (
      <div className='table-row header'>
        {cells}
      </div>
    );*/
    return (
      <tr key="title-row">
        {cells}
      </tr>
    );
  }
}

export default TitleRow;
