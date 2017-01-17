import React from 'react';

import Row from './row';
import CheckboxTitleCell from './cell-checkbox-title';
import TitleCell from './cell-title';
//import ActionsCell from './cell-actions';

class TitleRow extends Row {
  /*constructor(props) {
    super(props);
  }*/

  getIsAllSelected = () => {
    return this.props.isAllSelected;
  };

  getOrderDir = () => {
    return this.props.orderDir;
  };

  getTitleCheckboxCell = () => {
    return (
      <td key="selectAll">
        <CheckboxTitleCell
          onCheckboxAllClick={this.getActions().onCheckboxAllClick}
          isAllSelected={this.getIsAllSelected()}
        />
      </td>
    );
  };

  getTitleCell = (columnSchema) => {
    return (
      <th key={columnSchema.id}>
        <TitleCell
          columnSchema={columnSchema}
          orderDir={this.getOrderDir()}
          onSortClick={this.getActions().onSortClick} />
      </th>
    );
  };

  // must be empty for header/footer rows
  getTitleActionsCell = (actionId) => {
    return (
      <td key={this.createColumnKey(actionId)}>
        <div></div>
      </td>
    );
  };

  render() {
    let cells = [];
    let columnsCount = this.getColumns().length;

    // show checkbox column
    if (this.isSelectionEnabled()) {
      cells.push(this.getTitleCheckboxCell());
    }

    for (let i = 0; i < columnsCount; i++) {
      let columnSchema = this.getSchema()[this.getColumns()[i]];
      let cellTpl = this.getTitleCell(columnSchema);

      cells.push(cellTpl);
    }

    if (this.isEditingEnabled()) {
      let actionCellId = this.createUniqueActionCellId('action-title');

      cells.push(this.getTitleActionsCell(actionCellId));
    }

    return (
      <tr key="title-row">
        {cells}
      </tr>
    );
  }
}

export default TitleRow;
