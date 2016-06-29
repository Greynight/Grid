"use strict";

import React from 'react';

class HeaderCell extends React.Component {
  constructor(props) {
    super(props);
  }

  getData = () => {
    return this.props.cellData;
  };

  getSchema = () => {
    return this.props.columnSchema;
  };

  // TODO templates
  render() {
    let cellData = this.getData();

    return <div className="wrapper"><div className="text">{cellData}</div></div>;
  }
}

export default HeaderCell;
