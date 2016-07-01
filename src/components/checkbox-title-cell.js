"use strict";

import React from 'react';

class CheckboxTitleCell extends React.Component {
  constructor(props) {
    super(props);

    this.grid = this.props.grid;
    this.state = {
      isSelected: this.grid.state.isAllSelected
    };
  }

  onCheckboxClick = (evt) => {
    /*let oldValue = this.state.isSelected;

    this.setState({
      isSelected: !oldValue
    });*/
    this.grid.toggleAll();
  };

  componentWillReceiveProps = (nextProps) => {
    let grid = nextProps.grid;
    let isAllSelected = grid.state.isAllSelected;
    let isDataChanged = this.state.isSelected !== isAllSelected;

    if (isDataChanged) {
      this.setState({
        isSelected: isAllSelected
      });
    }
  };

  render() {
    return <div><input type="checkbox" checked={this.state.isSelected} onChange={this.onCheckboxClick} /></div>;
  }
}

export default CheckboxTitleCell;
