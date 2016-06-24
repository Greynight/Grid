"use strict";

import React from 'react';

class CheckboxCell extends React.Component {
  constructor(props) {
    super(props);
  }

  onCheckboxClick = (evt) => {
    let evtMy = evt;
    let row = this.getRow();
    console.log("checked");

    row.setState({
      row: {
        data: [1,2,3],
        id: row.id
      }
    });
    //row.props.data = [1,2,3];
    row.forceUpdate();
  };

  getRow = () => {
    return this.props.row;
  };

  render() {
    return <div className="wrapper"><input type="checkbox" onChange={this.onCheckboxClick} /></div>;
  }
}

export default CheckboxCell;
