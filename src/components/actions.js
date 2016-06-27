"use strict";

import React from 'react';

class ActionsCell extends React.Component {
  constructor(props) {
    super(props);

    this.grid = props.grid;
  }



  onCheckboxClick = (evt) => {
    //let isChecked = evt.currentTarget.checked;
    let row = this.getRow();
    //let rowId = row.id;

    this.grid.toggleRowSelection(row, evt);


    //console.log(row);
    //console.log("checked");

    /*row.setState({
     row: {
     data: [1,2,3],
     id: row.id
     }
     });*/
    //row.props.data = [1,2,3];
    //row.forceUpdate();
  };

  getRow = () => {
    return this.props.row.getRowData();
  };

  render() {
    return <div className="wrapper"><input type="checkbox" onChange={this.onCheckboxClick} /></div>;
  }
}

export default ActionsCell;
