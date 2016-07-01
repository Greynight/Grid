"use strict";

import React from 'react';

class ActionsCell extends React.Component {
  constructor(props) {
    super(props);

    this.grid = props.grid;
    this.row = this.props.row;
    this.isEmptyCell = this.props.isEmptyCell;

    this.state = {
      isEditing: false
    };
  }

  onAddRow = () => {
    /*this.state = {
      isEditing: true
    };*/

    //let row = this.getRow();

    return this.grid.addRow();
  };

  onEditRow = () => {
    this.state = {
      isEditing: true
    };

    this.row.changeToEditMode();
  };

  onSaveRow = () => {
    let row = this.row.getRowData();

    this.state = {
      isEditing: false
    };

    this.row.changeToReadMode();

    return this.grid.saveRow(row);
  };

  // or set old state on cancel?
  onCancelSaveRow = () => {
    this.state = {
      isEditing: false
    };

    this.row.changeToReadMode();
    this.grid.clearEditRowCache();
  };

  onDeleteRow = () => {
    let row = this.getRow();

    return this.grid.deleteRow(row);
  };

  getRow = () => {
    return this.row.getRowData();
  };

  render() {
    let template = undefined;

    if (this.isEmptyCell) {
      template = <div></div>;
    } else {
      template = (
        <div>
          { !this.state.isEditing ? <a href="#" onClick={this.onAddRow}>Add</a> : null}
          { !this.state.isEditing ? <a href="#" onClick={this.onDeleteRow}>Delete</a> : null}
          { !this.state.isEditing ? <a href="#" onClick={this.onEditRow}>Edit</a> : null}
          { this.state.isEditing ? <a href="#" onClick={this.onSaveRow}>Save</a> : null }
          { this.state.isEditing ? <a href="#" onClick={this.onCancelSaveRow}>Cancel</a> : null }
        </div>);
    }

    return template;
  }
}

export default ActionsCell;
