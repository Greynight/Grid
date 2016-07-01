"use strict";

import React from 'react';

import Templates from './templates';

// TODO extent some abstract 'cell' class

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      template: this.getCellTemplate,
      data: this.props.cellData
    };

    this.styles = {
      width: this.getSchema().width,
      minWidth: this.getSchema().minWidth
    };

    this.grid = this.props.grid;
  }

  getData = () => {
    return this.state.data;
  };

  getSchema = () => {
    return this.props.columnSchema;
  };

  getCellId = () => {
    return this.props.cellId;
  };

  /*getCellNum = (cellId) => {
    let cellIdParts = cellId.split('-');

    return cellIdParts[2];
  };*/

  getCellTemplate = () => {
    let columnSchema = this.columnsTemplates.getTemplate([this.getSchema()['type']]);

    if (!columnSchema) {
      throw new Error("There is no such column type in templates.js");
    }

    let templateType = this.getTemplateType();
    let cellTemplate = columnSchema[templateType];

    return cellTemplate;
  };

  getTemplateType = () => {
    return this.props.templateType;
  };

  /*onValueChange = (evt) => {
    let newValue = evt.target.value;
    let cellId = this.getCellId();
    let cellNum = this.getCellNum(cellId);

    this.grid.updateEditRowCache(cellNum, newValue);
  };*/

  render() {
    console.log("render cell");

    this.columnsTemplates = new Templates({
      data: this.state.data,
      onValueChange: this.onValueChange,
      styles: this.styles
    });


    return this.state.template();
  }

  /*componentWillReceiveProps = (nextProps) => {
    let isDataChanged = this.props.cellData !== nextProps.cellData;

    if (isDataChanged) {
      this.setState({
        data: nextProps.cellData
      });
    }
  };*/
}

export default Cell;
