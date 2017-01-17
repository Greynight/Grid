import React from 'react';

import Templates from './templates';

// TODO we need itemsCount, currentPage, itemsPerPage, customTemplate
class Pagination extends React.Component {
  constructor(props) {
    super(props);
console.log(props);
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

  /*
   <div class="pagination-container">
   <ul class="pagination">
   <li><a href="#">«</a></li>
   <li><a href="#">1</a></li>
   <li><a class="active" href="#">2</a></li>
   <li><a href="#">3</a></li>
   <li><a href="#">4</a></li>
   <li><a href="#">5</a></li>
   <li><a href="#">6</a></li>
   <li><a href="#">7</a></li>
   <li><a href="#">»</a></li>
   </ul>
   </div>
   */

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
