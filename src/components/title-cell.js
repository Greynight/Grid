"use strict";

import React from 'react';

class TitleCell extends React.Component {
  constructor(props) {
    super(props);
  }

  getSchema = () => {
    return this.props.columnSchema;
  };

  render() {
    console.log("render title cell");
    let cellData = this.getSchema();

    //return <div className="wrapper"><div className="text">{cellData.title}</div></div>;
    return (
      <div>
        {cellData.title}
      </div>
    );
  }
}

export default TitleCell;
