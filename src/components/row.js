import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);

    this.READ_TEMPLATE = 'template';
    this.EDIT_TEMPLATE = 'writableTemplate';

    this.state = {
      templateType: this.READ_TEMPLATE
    };
  }

  getColumns = () => {
    return this.props.columns;
  };

  getSchema = () => {
    return this.props.schema;
  };

  getConfig = () => {
    return this.props.config;
  };

  getRowData = () => {
    return this.props.data;
  };

  getActions = () => {
    return this.props.actions;
  };

  getTemplateType = (columnSchema) => {
    let templateType = '';

    if (this.isColumnEditable(columnSchema) || this.getRowData().id === null) {
      templateType = this.state.templateType;
    } else {
      templateType = this.READ_TEMPLATE;
    }

    return templateType;
  };

  changeToReadMode = () => {
    this.setState({
      templateType: this.READ_TEMPLATE
    });
  };

  changeToEditMode = () => {
    this.setState({
      templateType: this.EDIT_TEMPLATE
    });
  };

  isSelectionEnabled = () => {
    return this.getConfig().enableSelection;
  };

  isEditingEnabled = () => {
    return this.getConfig().enableEditing;
  };

  isColumnEditable = (columnSchema) => {
    return columnSchema.isEditable;
  };

  createUniqueCellId = (rowId, cellNum) => {
    return `cell-${rowId}-${cellNum}`;
  };

  createUniqueCheckboxCellId = (rowId) => {
    return `checkbox-${rowId}`;
  };

  createUniqueActionCellId = (rowId) => {
    return `action-${rowId}`;
  };

  createColumnKey = (cellId) => {
    return `td-${cellId}`;
  };
}

export default Row;
