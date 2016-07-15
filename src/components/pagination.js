"use strict";

import React from 'react';

import Templates from './templates';

// TODO we need itemsCount, currentPage, itemsPerPage, customTemplate
class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.customTemplate = this.props.template || false;



    /*this.styles = {
      width: this.getSchema().width,
      minWidth: this.getSchema().minWidth
    };

    this.grid = this.props.grid;*/
  }

  getTemplate = () => {
    return (
      <div>

      </div>
    );
  };



  render() {
    this.columnsTemplates = new Templates({
      data: this.state.data,
      onValueChange: this.onValueChange,
      styles: this.styles
    });


    return this.state.template();
  }

  /*componentWillReceiveProps = (nextProps) => {
   let isDataChanged = this.props.cellData !== nextProps.cellData;

   if (isDataChanged) {
   this.setState({
   data: nextProps.cellData
   });
   }
   };*/
}

export default Pagination;
