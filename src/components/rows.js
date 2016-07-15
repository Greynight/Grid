"use strict";

import React from 'react';

import BodyRow from './row-body';
import TitleRow from './row-title';
import HeaderRow from './row-header';
import FooterRow from './row-footer';

class Rows extends React.Component {
  constructor(props) {
    super(props);
  }

  getOrderDir = () => {
    return this.props.sorting.orderDir;
  };

  getData = () => {
    return this.props.data;
  };

  getIsAllSelected = () => {
    return this.props.isAllSelected;
  };

  getColumns = () => {
    return this.props.columns;
  };

  getSchema = () => {
    return this.props.schema;
  };

  getConfig = () => {
    return this.props.config;
  };

  getActions = () => {
    return this.props.actions;
  };


  hasHeaderRows = () => {
    return !!this.getData().headerRows.length;
  };

  hasBodyRows = () => {
    return !!this.getData().rows.length;
  };

  hasFooterRows = () => {
    return !!this.getData().footerRows.length;
  };

  getHeaderRows = () => {
    return this.getData().headerRows;
  };

  getBodyRows = () => {
    return this.getData().rows;
  };

  getFooterRows = () => {
    return this.getData().footerRows;
  };

  createUniqueRowKey = (row) => {
    return `row-${row.id}`;
  };

  render() {
    let headRows = [];
    let bodyRows = [];
    let footRows = [];

    //let {data, ...props} = this.props;

    headRows.push(
      <TitleRow
        key = 'Title'
        //{...props}
        orderDir = {this.getOrderDir()}
        isAllSelected = {this.getIsAllSelected()}
        columns = {this.getColumns()}
        schema = {this.getSchema()}
        config = {this.getConfig()}
        actions = {this.getActions()}
      />
    );

    // header rows
    if (this.hasHeaderRows()) {
      let headerRows = this.getHeaderRows();

      for (let headerRow of headerRows) {
        headRows.push(
          <HeaderRow
            key = {this.createUniqueRowKey(headerRow)}
            data = {headerRow}
            columns = {this.getColumns()}
            schema = {this.getSchema()}
            config = {this.getConfig()}
          />
        );
      }
    }

    // body rows
    if (this.hasBodyRows()) {
      let rows = this.getBodyRows();

      for (let bodyRow of rows) {
        bodyRows.push(
          <BodyRow
            key = {this.createUniqueRowKey(bodyRow)}
            data = {bodyRow}
            columns = {this.getColumns()}
            schema = {this.getSchema()}
            config = {this.getConfig()}
            actions = {this.getActions()}
          />);
      }
    }

    // footer rows
    if (this.hasFooterRows()) {
      let footerRows = this.getFooterRows();

      for (let footerRow of footerRows) {
        footRows.push(
          <FooterRow
            key = {this.createUniqueRowKey(footerRow)}
            data = {footerRow}
            columns = {this.getColumns()}
            schema = {this.getSchema()}
            config = {this.getConfig()}
          />);
      }
    }

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
