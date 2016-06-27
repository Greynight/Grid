"use strict";

import React from 'react';
//import uniqueId from 'lodash/uniqueId';

import CheckboxCell from './checkbox-cell';
import HeaderCell from './header-cell';
import BodyCell from './body-cell';
import FooterCell from './footer-cell';
import ActionsCell from './actions';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      row: this.props.data
    };
  }

  getCheckboxCell = (checkboxId) => {
    return <CheckboxCell key={checkboxId} row={this} grid={this.getGridInstance()} />;
  };

  // TODO configurable actions: delete, edit
  // TODO add ?
  // TODO icons?
  getActionsCell = (actionId) => {
    return <ActionsCell key={actionId} />;
  };

  getHeaderCell = (cellData, cellId, columnSchema) => {
    return <HeaderCell cellId={cellId} cellData={cellData} columnSchema={columnSchema} key={cellId} grid={this.getGridInstance()} />;
  };

  getBodyCell = (cellData, cellId, columnSchema) => {
    return <BodyCell cellId={cellId} cellData={cellData} columnSchema={columnSchema} key={cellId} grid={this.getGridInstance()} />;
  };

  getFooterCell = (cellData, cellId, columnSchema) => {
    return <FooterCell cellId={cellId} cellData={cellData} columnSchema={columnSchema} key={cellId} grid={this.getGridInstance()} />;
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

  getGridInstance = () => {
    return this.props.grid;
  };

  isSelectionEnabled = () => {
    return this.getConfig().enableSelection;
  };

  isEditingEnabled = () => {
    return this.getConfig().enableEditing;
  };

  createUniqueCellId = (rowId, cellNum) => {
    return `cell-${cellNum}-${rowId}`;
  };

  createUniqueCheckboxCellId = (rowId) => {
    return `checkbox-${rowId}`;
  };

  createUniqueActionCellId = (rowId) => {
    return `action-${rowId}`;
  };

  render() {
    let cells = [];

    let rowType = this.getRowType();
    let columns = this.getColumns();
    let schema = this.getSchema();
    let row = this.getRowData();
    let rowId = row.id;

    let columnsCount = columns.length;

    let getter = `get${rowType}Cell`;

    // show checkbox column
    if (this.isSelectionEnabled()) {
      let checkboxId = this.createUniqueCheckboxCellId(rowId);

      cells.push(this.getCheckboxCell(checkboxId));
    }

    for (let i = 0; i < columnsCount; i++) {
      let cellData = row.data[i];
      let cellId = this.createUniqueCellId(rowId, i);
      let columnSchema = schema[columns[i]];
      let cellTpl = this[getter](cellData, cellId, columnSchema);

      cells.push(cellTpl);
    }

    // Show action buttons column
    if (this.isEditingEnabled()) {
      let actionCellId = this.createUniqueActionCellId(rowId);

      cells.push(this.getActionsCell(actionCellId));
    }

    return (
      <div className='table-row'>
        {cells}
      </div>
    );
  }
}

export default Row;
