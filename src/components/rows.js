"use strict";

import React from 'react';
import uniqueId from 'lodash/uniqueId';

import Row from './row';
import TitleRow from './title-row';

class Rows extends React.Component {
  constructor(props) {
    super(props);
  }

  hasHeaderRows = () => {
    return !!this.props.data.headerRows.length;
  };

  hasBodyRows = () => {
    return !!this.props.data.rows.length;
  };

  hasFooterRows = () => {
    return !!this.props.data.footerRows.length;
  };

  getHeaderRows = () => {
    return this.props.data.headerRows;
  };

  getBodyRows = () => {
    return this.props.data.rows;
  };

  getFooterRows = () => {
    return this.props.data.footerRows;
  };

  // TODO not sure if this is the best approach index number of row/cell may be used
  generateUniqueKey = () => {
    return uniqueId('row');
  };

  // types can be 'title', 'header', 'body', 'footer'
  // TODO generate random keys?
  render() {
    let gridRows = [];
    let {data, ...props} = this.props;

    gridRows.push(<TitleRow key='titles' {...props} />);

    // header rows
    if (this.hasHeaderRows()) {
      let headerRows = this.getHeaderRows();

      for (let headerRow of headerRows) {
        gridRows.push(<Row type="Header" key={this.generateUniqueKey()} data={headerRow} {...props} />);
      }
    }

    // body rows
    if (this.hasBodyRows()) {
      let rows = this.getBodyRows();

      for (let row of rows) {
        gridRows.push(<Row type="Body" key={this.generateUniqueKey()} data={row} {...props} />);
      }
    }

    // footer rows
    if (this.hasFooterRows()) {
      let footerRows = this.getFooterRows();

      for (let footerRow of footerRows) {
        gridRows.push(<Row type="Footer" key={this.generateUniqueKey()} data={footerRow} {...props} />);
      }
    }

    return (
      <div>
        {gridRows}
      </div>);
  }
}

export default Rows;
