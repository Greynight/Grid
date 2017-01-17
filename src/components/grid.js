import React from 'react';
import ReactDOM from 'react-dom';

import uniqueId from 'lodash/uniqueId';

import Rows from './rows';
import Pagination from './pagination';

const defaultConfig = {
  parentId: 'grid',
  showHeader: false,
  showFooter: false,
  enableSelection: true,
  enableEditing: true,
  enablePagination: false,
  enableSorting: false,
  internalSorting: false,
  externalSorting: false,
  sortCycle: ['', 'asc', 'desc'],
  internalPaging: false,
  externalPaging: false,
  paginationTemplate: false,
  paginationRowsNumList: [25, 50, 100, 200]
};

const defaultSchemaItem = {
  isSortable: false,
  isEditable: false,
  minWidth: 100,
  width: null
};

class Grid extends React.Component {
  constructor(props) {
    super(props);

    let config = Object.assign({}, this.props.config, defaultConfig);

    this.editRowCache = [];

    this.state = {
      selectedRows: new Map(),
      lastSelected: {},
      isAllSelected: false,
      // columns list
      columns: this.props.columns || [],
      // columns structure
      schema: this.setSchema(this.props.schema),
      // grid data
      data: this.applyData(this.props.data) || {},
      // grid config
      config: config,
      // pagination TODO
      pagination: {
        template: config.paginationTemplate,
        paginationRowsNumList: config.paginationRowsNumList,
        rowsPerPage:this.getDefaultRowsPerPage(config),
        rowsCount: null,
        rowsOffset: null
      },
      // TODO ability to set sortOrderCycle
      // TODO ability to set sorting function
      sorting: {
        orderBy: this.getDefaultOrderBy(this.props.columns),
        orderDir: this.getDefaultOrderDir(config),
        cycle: ['', 'asc', 'desc']
      },
      actions: this.getActions()
    };

    if (!this.props.config) {
      throw new Error("Config wasn't defined");
    }

    if (!this.props.schema) {
      throw new Error("Schema wasn't defined");
    }
  }

  /**
   * ---------- SORTING ----------
   */

  isGridSortable = () => {
    return this.state.config.enableSorting;
  };

  getDefaultOrderBy = (columns) => {
    return columns && columns[0];
  };

  getDefaultOrderDir = (config) => {
    return config.sortCycle[0];
  };

  setSortingColumn = (columnId) => {
    let newSortingState = Object.assign({}, this.state.sorting, {orderBy: columnId});

    this.setState({
      sorting: newSortingState
    });
  };

  getSortingColumn = () => {
    return this.state.sorting.orderBy;
  };

  setSortingDirection = (direction) => {
    let newSortingState = Object.assign({}, this.state.sorting, {orderDir: direction});

    this.setState({
      sorting: newSortingState
    });
  };

  getSortingDir = () => {
    return this.state.sorting.orderDir;
  };

  getSortingCycle = () => {
    return this.state.sorting.cycle;
  };

  setSortingCycle = (sortingCycle) => {
    this.setState({
      sorting: {
        cycle: sortingCycle,
        orderBy: this.getSortingColumn(),
        orderDir: this.getSortingDir()
      }
    });
  };

  getNextSortingDir = () => {
    let sortingCycle = this.getSortingCycle();
    let sortDirIndex = sortingCycle.indexOf(this.getSortingDir());

    if (sortDirIndex === -1) {
       throw new Error('Try to sort by unknown "orderDir"');
    }

    sortDirIndex = (sortDirIndex + 1) % sortingCycle.length;

    return sortingCycle[sortDirIndex];
  };

  // internal and external sorting
  // TODO save not sorted state?
  sortData = (orderBy, orderDir) => {
    if (this.getConfig().internalSorting) {
      // sort data using default or user-defined function
      this.internalSort(orderBy, orderDir);
    } else if(this.getConfig().externalSorting) {
      // call user-defined callback
      this.onSortingChange(orderBy, orderDir);
    } else {
      throw new Error("You must enable External or Internal sorting");
    }
  };

  internalSort = (orderBy, orderDir) => {
    let sortColumn = orderBy || this.getSortingColumn();
    let sortDir = orderDir || this.getSortingDir();
    let sortColumnIndex = this.getColumns().indexOf(sortColumn);
    let data = this.getData();

    if (sortColumnIndex !== -1) {
      let dataSectionsNames = Object.keys(data);
      //let sortingDirFunc = this[`${sortDir}Sorting`];

      for (let dataSectionName of dataSectionsNames) {
        let dataSection = data[dataSectionName];

        dataSection.sort(this.sortingFunc(sortColumnIndex, sortDir));
      }
    }
  };

  sortingFunc = (sortColumnIndex, sortDir) => {
    let sortOrder = sortDir === 'asc' ? 1 : -1;

    return function(a, b) {
      return sortOrder * (a.data[sortColumnIndex] - b.data[sortColumnIndex]);
    };
  };

  /**
   *  ---------- PAGINATION ----------
   */

  getDefaultRowsPerPage = (config) => {
    return config.rowsPerPage;
  };

  /*paginationRowsNumList = (num) => {
    let newState = Object.assign(this.state, {pagination: {}});
    this.setState();
  };
*/


  // TODO default sort order and column
  // TODO set column width
  render = () => {
    let {...props} = Object.assign({}, this.state/*, {grid: this}*/);
    let config = this.getConfig();
    let isPaginationEnabled = false;

    if (config.enablePagination) {
      if (config.internalPaging && config.externalPaging) {
        throw new Error('You must choose only one pagination type.');
      }

      if (!config.internalPaging && !config.externalPaging) {
        throw new Error('You must choose at least one pagination type.');
      }

      isPaginationEnabled = true;
    }

    return (
      <div className="md-whiteframe-z1">
        <Rows {...props} />
        { isPaginationEnabled ? <Pagination data={this.state.pagination} /> : null}
      </div>);
  };






  // TODO  separate public api somehow
  renderGrid = () => {
    let {...props} = Object.assign({}, this.state);

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

  setSchema = (schema = {}) => {
    let schemaItems = Object.values(schema);

    for (let schemaItem of schemaItems) {
      schemaItem = Object.assign(defaultSchemaItem, schemaItem);
    }

    return schema;
  };

  applyData = (data = {}) => {
    let processedData = Object.assign({}, this.transformData(this.props.data));

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
    let transformedData = {};

    if (this.isDataTransformed(data)) {
      transformedData = data;
    } else {
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
    }

    return transformedData;
  };

  isDataTransformed = (data) => {
    return !Array.isArray(data.rows[0]);
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


  /**
   * ---------- SELECTION ----------
   */

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
   * @param changedRow
   * @param event
   */
  toggleRowSelection(changedRow, event = {}) {
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


  /**
   * ---------- EDITING ----------
   */
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

    data.rows.unshift({
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

  getActions = () => {
    return {
      'onSortClick': this.onSortClick,
      'onCheckboxAllClick': this.onCheckboxAllClick,
      'onCheckboxClick': this.onCheckboxClick,
      'onCellChange': this.onCellChange,
      'onDeleteRow': this.onDeleteRow,
      'onEditRow': this.onEditRow,
      'onSaveRow': this.onSaveRow,
      'onAddRow': this.onAddRow,
      'onCancelSaveRow': this.onCancelSaveRow
    };
  };

  // TODO public over-writable methods
  // pass as actions


  onSortingChange = (orderBy, orderDir) => {};


  /**
   * ---------- ACTIONS ----------
   */
  onSortClick = (columnId) => {
    if (this.isGridSortable()) {
      let orderDir = null;
      let orderBy = null;

      if (this.getSortingColumn() !== columnId) {
        orderBy = columnId;
        orderDir = this.getDefaultOrderDir();

        this.setSortingColumn(orderBy);
      } else {
        orderDir = this.getNextSortingDir();
      }

      this.setSortingDirection(orderDir);
      this.sortData(orderBy, orderDir);
    }
  };

  onCheckboxAllClick = () => {
    this.toggleAll();
  };

  onCheckboxClick = (rowData, event) => {
    this.toggleRowSelection(rowData, event);
  };

  onCellChange = (cellNum, newValue) => {
    this.updateEditRowCache(cellNum, newValue);
  };

  onDeleteRow = (row) => {
    this.deleteRow(row);
  };

  onEditRow = () => {};

  onSaveRow = (row) => {
    this.saveRow(row)
  };

  onAddRow = () => {
    this.addRow();
  };

  onCancelSaveRow = () => {
    this.clearEditRowCache();
  };






}

export default Grid;
