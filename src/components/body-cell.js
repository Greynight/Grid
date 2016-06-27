"use strict";

import React from 'react';

import Templates from './templates';

// TODO extent some abstract 'cell' class

class BodyCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      template: this.getCellTemplate,
      data: this.props.cellData
    };

    this.columnsTemplates = new Templates(this.state.data);
  }

  getData = () => {
    return this.state.data;
  };

  getSchema = () => {
    return this.props.columnSchema;
  };

  getCellTemplate = () => {
    let columnSchema = this.columnsTemplates.getTemplate([this.getSchema()['type']]);

    if (!columnSchema) {
      throw new Error("There is no such column type in templates.js");
    }

    let cellTemplate = columnSchema.template;

    return cellTemplate;
  };

  render() {
    return this.state.template();
  }
}

export default BodyCell;
