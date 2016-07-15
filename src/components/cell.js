"use strict";

import React from 'react';

import Templates from './templates';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.READ_TEMPLATE = 'template';

    this.state = {
      template: this.getCellTemplate
    };

    this.styles = {
      width: this.getSchema().width,
      minWidth: this.getSchema().minWidth
    };
  }

  getCellData = () => {
    return this.props.cellData;
  };

  getSchema = () => {
    return this.props.columnSchema || {};
  };

  getColumnId = () => {
    return this.getSchema().id;
  };

  getCellTemplate = () => {
    let type = this.getSchema()['type'];
    let columnSchema = this.columnsTemplates.getTemplate([type]);

    if (!columnSchema) {
      throw new Error(`There is no such column type like ${type} in templates.js`);
    }

    let templateType = this.getTemplateType();
    let cellTemplate = columnSchema[templateType];

    return cellTemplate;
  };

  getTemplateType = () => {
    return this.props.templateType || this.READ_TEMPLATE;
  };

  render() {
    this.columnsTemplates = new Templates({
      data: this.getCellData(),
      styles: this.styles
    });

    return this.state.template();
  }
}

export default Cell;
