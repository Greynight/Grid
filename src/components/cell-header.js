import Cell from './cell';

class HeaderCell extends Cell {
  constructor(props) {
    super(props);

    this.READ_TEMPLATE = 'headerTemplate';
  }
}

export default HeaderCell;
