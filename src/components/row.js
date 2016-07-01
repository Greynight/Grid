"use strict";

import React from 'react';
//import uniqueId from 'lodash/uniqueId';

import CheckboxCell from './checkbox-cell';
import HeaderCell from './header-cell';
import BodyCell from './body-cell';
import FooterCell from './footer-cell';
import ActionsCell from './actions';

const BODY_ROW = 'Body';
const READ_TEMPLATE = 'template';
const EDIT_TEMPLATE = 'writableTemplate';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      row: this.props.data,
      templateType: READ_TEMPLATE
    };
  }

  // TODO maybe not show checkbox in editing mode?
  getCheckboxCell = (checkboxId, isEmptyCell) => {
    return (
      <td key={this.createColumnKey(checkboxId)}>
        <CheckboxCell
          key={checkboxId}
          row={this}
          isEmptyCell={isEmptyCell}
          grid={this.getGridInstance()} />
      </td>
    );
  };

  // TODO configurable actions: delete, edit
  // TODO add ?
  // TODO icons?
  getActionsCell = (actionId, isEmptyCell) => {
    return (
      <td key={this.createColumnKey(actionId)}>
        <ActionsCell
          key={actionId}
          isEmptyCell={isEmptyCell}
          grid={this.getGridInstance()}
          row={this} />
      </td>
    );
  };

  getHeaderCell = (cellData, cellId, columnSchema, templateType = '') => {
    return (
      <td key={this.createColumnKey(cellId)}>
        <HeaderCell
          cellId={cellId}
          cellData={cellData}
          columnSchema={columnSchema}
          templateType={templateType}
          grid={this.getGridInstance()}
        />
      </td>
    );
  };

  getBodyCell = (cellData, cellId, columnSchema, templateType = '') => {
    return (
      <td key={this.createColumnKey(cellId)}>
        <BodyCell
          cellId={cellId}
          cellData={cellData}
          columnSchema={columnSchema}
          templateType={templateType}
          grid={this.getGridInstance()}
        />
      </td>
    );
  };

  getFooterCell = (cellData, cellId, columnSchema, templateType = '') => {
    return (
      <td key={this.createColumnKey(cellId)}>
        <FooterCell
          cellId={cellId}
          cellData={cellData}
          columnSchema={columnSchema}
          templateType={templateType}
          grid={this.getGridInstance()}
        />
      </td>
    );
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

  getTemplateType = (columnSchema) => {
    let templateType = '';

    if (this.isColumnEditable(columnSchema)) {
      templateType = this.state.templateType;
    } else {
      templateType = READ_TEMPLATE;
    }

    return templateType;
  };

  changeToReadMode = () => {
    this.setState({
      templateType: READ_TEMPLATE
    });
  };

  changeToEditMode = () => {
    this.setState({
      templateType: EDIT_TEMPLATE
    });
  };

  isSelectionEnabled = () => {
    return this.getConfig().enableSelection;
  };

  isEditingEnabled = () => {
    return this.getConfig().enableEditing;
  };

  isColumnEditable = (columnSchema) => {
    return columnSchema.isEditable;
  };

  createUniqueCellId = (rowId, cellNum) => {
    return `cell-${rowId}-${cellNum}`;
  };

  createUniqueCheckboxCellId = (rowId) => {
    return `checkbox-${rowId}`;
  };

  createUniqueActionCellId = (rowId) => {
    return `action-${rowId}`;
  };



  createColumnKey = (cellId) => {
    return `td-${cellId}`;
  };

  render() {
    console.log("render row");
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
      let isEmptyCell = rowType !== BODY_ROW;
      let checkboxId = this.createUniqueCheckboxCellId(rowId);

      cells.push(this.getCheckboxCell(checkboxId, isEmptyCell));
    }

    for (let i = 0; i < columnsCount; i++) {
      let cellData = row.data[i];
      let cellId = this.createUniqueCellId(rowId, i);
      let columnSchema = schema[columns[i]];

      let templateType = this.getTemplateType(columnSchema);

      //let templateType = this.state.templateType;
      let cellTpl = this[getter](cellData, cellId, columnSchema, templateType);

      cells.push(cellTpl);
    }

    // Show action buttons column(but not for header/footer rows)
    if (this.isEditingEnabled()) {
      let isEmptyCell = rowType !== BODY_ROW;
      let actionCellId = this.createUniqueActionCellId(rowId);

      cells.push(this.getActionsCell(actionCellId, isEmptyCell));
    }

    /*return (
      <div className='table-row'>
        {cells}
      </div>
    );*/
    return (
      <tr key={rowId}>
        {cells}
      </tr>
    );
  }
}

export default Row;
