"use strict";

import React from 'react';
//import uniqueId from 'lodash/uniqueId';

import Row from './row';
import TitleRow from './title-row';

const HEADER_TYPE = 'Header';
const BODY_TYPE = 'Body';
const FOOTER_TYPE = 'Footer';

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
    //console.log(this.props.data.rows);
    return this.props.data.rows;
  };

  getFooterRows = () => {
    return this.props.data.footerRows;
  };

  createUniqueRowKey = (row) => {
    return `row-${row.id}`;
  };

  // types can be 'title', 'header', 'body', 'footer'
  // TODO generate random keys?
  render() {
    console.log("render rows");
    //let gridRows = [];
    let headRows = [];
    let bodyRows = [];
    let footRows = [];

    let {data, ...props} = this.props;

    headRows.push(<TitleRow key='titles' {...props} />);

    // header rows
    if (this.hasHeaderRows()) {
      let headerRows = this.getHeaderRows();

      for (let headerRow of headerRows) {
        headRows.push(<Row type={HEADER_TYPE} key={this.createUniqueRowKey(headerRow)} data={headerRow} {...props} />);
      }
    }

    // body rows
    if (this.hasBodyRows()) {
      let rows = this.getBodyRows();

      for (let row of rows) {
        bodyRows.push(<Row type={BODY_TYPE} key={this.createUniqueRowKey(row)} data={row} {...props} />);
      }
    }

    // footer rows
    if (this.hasFooterRows()) {
      let footerRows = this.getFooterRows();

      for (let footerRow of footerRows) {
        footRows.push(<Row type={FOOTER_TYPE} key={this.createUniqueRowKey(footerRow)} data={footerRow} {...props} />);
      }
    }


    /*return (
      <div>
        {gridRows}
      </div>);*/
    return (
      <table className="pl-table pl-table-striped pl-table-hovered pl-table-bordered">
        <thead>
          {headRows}
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
        <tfoot>
          {footRows}
        </tfoot>
      </table>
    );
  }
}

export default Rows;
