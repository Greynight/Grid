"use strict";

import React from 'react';

import Cell from './cell';

class ActionsCell extends Cell {
  constructor(props) {
    super(props);

    this.rowData = this.props.rowData;

    this.state = {
      isEditing: false
    };

    this.onCancelSaveRow = this.props.onCancelSaveRow;
    this.onAddRow = this.props.onAddRow;
    this.onSaveRow = this.props.onSaveRow;
    this.onDeleteRow = this.props.onDeleteRow;
    this.onCellChange = this.props.onCellChange;
    this.onCheckboxClick = this.props.onCheckboxClick;
    this.onCheckboxAllClick = this.props.onCheckboxAllClick;
    this.onSortClick = this.props.onSortClick;

    this.changeToEditMode = this.props.changeToEditMode;
    this.changeToReadMode = this.props.changeToReadMode;


    // TODO add new row as the first
    if (this.rowData.id === null) {
      this.state.isEditing = true;
    }
  }

  onAddRowClick = () => {
    return this.onAddRow();
  };

  onEditRowClick = () => {
    this.state = {
      isEditing: true
    };

    this.changeToEditMode();
  };

  onSaveRowClick = () => {
    this.state = {
      isEditing: false
    };

    this.changeToReadMode();

    this.onSaveRow(this.rowData);
  };

  onCancelSaveRowClick = () => {
    this.state = {
      isEditing: false
    };

    this.changeToReadMode();
    this.onCancelSaveRow();
  };

  onDeleteRowClick = () => {
    this.onDeleteRow(this.rowData);
  };

  render() {
    return (
        <div>
          { !this.state.isEditing ? <a href="#" onClick={this.onAddRowClick}>Add</a> : null}
          { !this.state.isEditing ? <a href="#" onClick={this.onDeleteRowClick}>Delete</a> : null}
          { !this.state.isEditing ? <a href="#" onClick={this.onEditRowClick}>Edit</a> : null}
          { this.state.isEditing ? <a href="#" onClick={this.onSaveRowClick}>Save</a> : null }
          { this.state.isEditing ? <a href="#" onClick={this.onCancelSaveRowClick}>Cancel</a> : null }
        </div>);
  }
}

export default ActionsCell;
