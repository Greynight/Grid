"use strict";

import React from 'react';

class CheckboxTitleCell extends React.Component {
  constructor(props) {
    super(props);
  }

  onCheckboxClick = (evt) => {
    console.log(evt);
  };

  render() {
    return <div className="wrapper"><input type="checkbox" onChange={this.onCheckboxClick} /></div>;
  }
}

export default CheckboxTitleCell;
