"use strict";

import React from 'react';

import Row from './row';
import CheckboxCell from './cell-checkbox';
import BodyCell from './cell-body';
import ActionsCell from './cell-actions';

class BodyRow extends Row {
  constructor(props) {
    super(props);

    if (this.getRowData() && this.getRowData().id === null) {
      this.state.templateType = this.EDIT_TEMPLATE;
    }
  }

  // TODO do not show checkbox in editing mode?

  getCheckboxCell = (checkboxId) => {
    return (
      <td key = {this.createColumnKey(checkboxId)}>
        <CheckboxCell
          key = {checkboxId}
          rowData = {this.getRowData()}
          onCheckboxClick = {this.getActions().onCheckboxClick}
        />
      </td>
    );
  };

  // TODO configurable getActions(): delete, edit
  // TODO icons?
  getActionsCell = (actionId) => {
    return (
      <td key = {this.createColumnKey(actionId)}>
        <ActionsCell
          key = {actionId}
          rowData = {this.getRowData()}
          changeToEditMode = {this.changeToEditMode}
          changeToReadMode = {this.changeToReadMode}
          onCancelSaveRow = {this.getActions().onCancelSaveRow}
          onAddRow = {this.getActions().onAddRow}
          onSaveRow = {this.getActions().onSaveRow}
          onDeleteRow = {this.getActions().onDeleteRow}
          onCellChange = {this.getActions().onCellChange}
          onCheckboxClick = {this.getActions().onCheckboxClick}
          onCheckboxAllClick = {this.getActions().onCheckboxAllClick}
          onSortClick = {this.getActions().onSortClick}
        />
      </td>
    );
  };

  getBodyCell = (cellData, cellId, columnSchema, templateType = '') => {
    return (
      <td key = {this.createColumnKey(cellId)}>
        <BodyCell
          cellId = {cellId}
          cellData = {cellData}
          columnSchema = {columnSchema}
          templateType = {templateType}
          onCellChange = {this.getActions().onCellChange}
        />
      </td>
    );
  };

  render() {
    let cells = [];
    let rowId = this.getRowData().id;
    let columnsCount = this.getColumns().length;

    // show checkbox column
    if (this.isSelectionEnabled()) {
      let checkboxId = this.createUniqueCheckboxCellId(rowId);

      cells.push(this.getCheckboxCell(checkboxId));
    }

    for (let i = 0; i < columnsCount; i++) {
      let cellData = this.getRowData().data[i];
      let cellId = this.createUniqueCellId(rowId, i);
      let columnSchema = this.getSchema()[this.props.columns[i]];
      let templateType = this.getTemplateType(columnSchema);
      let cellTpl = this.getBodyCell(cellData, cellId, columnSchema, templateType);

      cells.push(cellTpl);
    }

    // Show action buttons column
    if (this.isEditingEnabled()) {
      let actionCellId = this.createUniqueActionCellId(rowId);

      cells.push(this.getActionsCell(actionCellId));
    }

    return (
      <tr key = {rowId}>
        {cells}
      </tr>
    );
  }
}

export default BodyRow;
