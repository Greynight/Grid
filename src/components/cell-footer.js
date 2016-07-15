"use strict";

import Cell from './cell';

class FooterCell extends Cell {
  constructor(props) {
    super(props);

    this.READ_TEMPLATE = 'footerTemplate';
  }
}

export default FooterCell;
