import React from 'react';

import Row from './row';
import HeaderCell from './cell-header';

class HeaderRow extends Row {
  /*constructor(props) {
    super(props);
  }*/

  getCheckboxCell = (checkboxId) => {
    return (
      <td key={this.createColumnKey(checkboxId)}>
        <div></div>
      </td>
    );
  };

  getActionsCell = (actionId) => {
    return (
      <td key={this.createColumnKey(actionId)}>
        <div></div>
      </td>
    );
  };

  getHeaderCell = (cellData, cellId, columnSchema) => {
    return (
      <td key={this.createColumnKey(cellId)}>
        <HeaderCell
          cellData={cellData}
          columnSchema={columnSchema}
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
      // data!
      let cellId = this.createUniqueCellId(rowId, i);
      let columnSchema = this.getSchema()[this.getColumns()[i]];
      let cellData = this.getRowData().data[i];
      let cellTpl = this.getHeaderCell(cellData, cellId, columnSchema);

      cells.push(cellTpl);
    }

    // Show action buttons column(but not for header/footer rows)
    if (this.isEditingEnabled()) {
      let actionCellId = this.createUniqueActionCellId(rowId);

      cells.push(this.getActionsCell(actionCellId));
    }

    return (
      <tr key={rowId}>
        {cells}
      </tr>
    );
  }
}

export default HeaderRow;
