"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import uniqueId from 'lodash/uniqueId';

import Rows from './rows';


class Grid extends React.Component {

  constructor(props) {
    super(props);

    this.editRowCache = [];

    this.state = {
      selectedRows: new Map(),
      lastSelected: {},
      isAllSelected: false,
      // columns list
      columns: this.props.columns || [],
      // columns structure
      // TODO merge column structure with some default options
      schema: this.props.schema,
      // grid data
      data: this.applyData(this.props.data, this.props.isDataTransformed) || {},
      // grid config
      config: this.props.config
    };

    if (!this.props.config || !this.props.schema) {
      throw new Error("Config or schema weren't defined");
    }
  }

  // TODO if not empty
  render = () => {
    console.log("render grid");
    let {...props} = Object.assign({}, this.state, {grid: this});

    return (
      <div className="md-whiteframe-z1">
        <Rows {...props} />
      </div>);
  };

  renderGrid = () => {
    console.log("renderGrid");
    let {...props} = Object.assign({}, this.state, {isDataTransformed: true});

    ReactDOM.render(<Grid {...props} />, document.getElementById(this.getConfig().parentId));
  };

  // TODO use setState for setters

  getConfig = () => {
    return this.state.config;
  };

  setColumns = (columns = []) => {
    this.setState({columns});
  };

  clearColumns = () => {
    this.setState({
      columns: []
    });
  };

  clearEditRowCache = () => {
    this.editRowCache.length = 0;
  };

  getEditRowCache = () => {
    return this.editRowCache;
  };

  updateEditRowCache = (index, value) => {
    this.editRowCache[index] = value;
  };

  getColumns = () => {
    return this.state.columns;
  };

  applyData = (data = {}, isDataTransformed) => {
    let processedData = {};

    if (isDataTransformed) {
      processedData = Object.assign({}, data);
    } else {
      processedData = Object.assign({}, this.transformData(this.props.data));
    }

    return processedData;
  };

  setData = (data = {}) => {
    /*if (this.getColumns().length !== rows[0].length) {
     through new Error("Number of columns isn't equal to number of cells in a row");
     }*/
    let transformedData = this.transformData(data);

    this.setState({
      data: Object.assign({}, transformedData)
    });
  };

  transformData = (data = {}) => {
    //console.log(data);
    // TODO don't apply to already transformed data
    let transformedData = {};

    let dataKeys = Object.keys(data);

    for (let rowsSection of dataKeys) {
      let transformedRows = [];
      let rows = data[rowsSection];

      for (let row of rows) {
        transformedRows.push({
          data: row,
          id: this.generateId(),
          isSelected: false
        });
      }

      transformedData[rowsSection] = transformedRows;
    }

    return transformedData;
  };

  generateId = () => {
    return uniqueId();
  };

  getData = () => {
    return this.state.data;
  };

  clearData = () => {
    this.setState({
      data: {}
    });
  };

  isEmpty = () => {
    return !!this.state.data.length;
  };





  // SELECTION
  // TODO or move to ROW?
  addToSelected(row) {
    let selectedRows = this.state.selectedRows.set(row.id, row);

    this.setState({
      selectedRows: selectedRows
    });
  }

  removeFromSelected(row) {
    let selectedRows = this.state.selectedRows;
    selectedRows.delete(row.id);

    this.setState({
      selectedRows: selectedRows
    });
  }

  /**
   * Gets number of selected rows
   * @returns {number}
   */
  getSelectedRowsCount() {
    return this.getSelectedRows().size;
  }

  /**
   * Returns a collection of selected rows
   * @returns Map
   */
  getSelectedRows() {
    return this.state.selectedRows;
  }

  getSelectedRowsIds() {
    let ids = [];
    this.getSelectedRows().forEach(item => ids.push(item.id));

    return ids;
  }

  /**
   * Returns previous selected row
   * @returns {object}
   */
  getLastSelectedRow() {
    return this.state.lastSelected;
  }

  setLastSelectedRow(row) {
    this.setState({
      lastSelected: Object.assign({}, row)
    });
  }

  /**
   * Clears collection of selected rows
   */
  clearSelectedRows() {
    //console.log(this.state.selectedRows);
    /*this.setState({
      selectedRows: this.state.selectedRows.clear()
    });*/
    this.state.selectedRows.clear();
  }

  /**
   * Toggle all rows selection
   */
  toggleAll() {
    let newSelectionState = !this.state.isAllSelected;

    this.clearSelectedRows();

    let data = this.getData();
    let rows = data.rows;

    for (let row of rows) {
      row.isSelected = newSelectionState;

      if (newSelectionState) {
        this.addToSelected(row);
      }
    }

    this.setState({
      data: Object.assign({}, data),
      isAllSelected: newSelectionState
    });
  }

  /**
   * Called on checkbox click, toggles rows between selected and not selected state
   * @param row
   * @param event
   */
  toggleRowSelection(changedRow, event = {}) {
    // TODO row.isSelected ?
    let selectedRows = this.getSelectedRows();
    let wasSelected = selectedRows.has(changedRow.id);

    if (!wasSelected) {
      this.addToSelected(changedRow);
    } else {
      this.removeFromSelected(changedRow);
    }

    let data = this.getData();
    let rows = data.rows;

    for (let row of rows) {
      if (row.id === changedRow.id) {

        console.log(row);

        row.isSelected = !wasSelected;

        this.setState({
          data: Object.assign({}, data)
        });

        break;
      }
    }

    // if click with shift button was used
    if (this.getSelectedRowsCount() > 1 && event.shiftKey) {
      this.selectRowsRange(changedRow);
    }

    // If all rows are selected, set checkbox "select all"
    if (rows.length === this.getSelectedRowsCount()) {
      this.setState({
        isAllSelected: true
      });
    } else {
      this.setState({
        isAllSelected: false
      });
    }

    this.setLastSelectedRow(changedRow);


    //console.log(this.getSelectedRows().entries());
  }

  /**
   * Saves rows, selected using 'shift' key, to the selected rows
   * @param row
   */
  selectRowsRange(row) {
    let isInRange = false;
    let lastSelectedRow = this.getLastSelectedRow();

    for (let visibleRow of this.state.data) {
      if ((visibleRow.id === lastSelectedRow.id || visibleRow.id === row.id) && !isInRange) {
        isInRange = true;
      } else if ((visibleRow.id === lastSelectedRow.id || visibleRow.id === row.id) && isInRange) {
        isInRange = false;
      } else {
        if (isInRange) {
          visibleRow.isSelected = true;
          this.addToSelected(visibleRow);
        }
      }
    }
  }


  // EDITING
// TODO add new rows to the top
  saveRow = (rowToSave) => {
    let rowToSaveId = rowToSave.id;
    let data = this.getData();
    let rows = data.rows;

    for (let row of rows) {
      if (rowToSaveId === row.id) {
        // new row
        if (!rowToSaveId) {
          row.id = this.generateId();
          row.data = this.getEditRowCache().slice(0);
        // if existing row
        } else {
          let editedData = this.getEditRowCache();
          let rowData = row.data;
          let cellsCount = rowData.length;

          for (let i = 0; i < cellsCount; i++) {
            if (editedData[i] !== undefined) {
              rowData[i] = editedData[i];
            }
          }

          break;
        }
      }
    }

    this.clearEditRowCache();

    this.setState({
      data: Object.assign({}, data)
    });
  };

  addRow = () => {
    let data = this.getData();
    data.rows.push({
      id: null,
      data: [],
      isSelected: false
    });

    this.setState({
      data: Object.assign({}, data)
    });
    // add empty row in editing mode
  };

  // TODO redefine this method, or call some callback
  deleteRow = (deletedRow) => {
    let deletedRowId = deletedRow.id;
    let data = this.getData();
    let rows = data.rows;
    let rowsCount = rows.length;

    for (let i = 0; i < rowsCount; i++) {
      if (rows[i].id === deletedRowId) {
        rows.splice(i, 1);

        break;
      }
    }

    // maybe delete and add
    // or re-generate id
    this.setState({
      data: Object.assign({}, data)
    });
  };

}

export default Grid;
