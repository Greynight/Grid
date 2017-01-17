/**
 * App entry point
 */

import './index.css';

// TODO overridable pagination template
// TODO fixed columns

import Grid from './components/grid';

// TODO set grid width, height
let config = {
  parentId: 'grid',
  showHeader: true,
  showFooter: true,
  enableSelection: true,
  enableEditing: true,
  enablePagination: true,
  enableSorting: true,
  internalSorting: true,
  externalSorting: false,
  internalPaging: false,
  externalPaging: false,
  paginationTemplate: false,
  paginationRowsNumList: [25, 50, 100]
};

let schema = {
  'id': {
    id: 'id',
    title: 'Id',
    // template isn't required, so 'text' will be used
    // some way to define templates and store them is needed
    type: 'text',
    // not required
    isSortable: true,
    isEditable: false,
    minWidth: 100,
    width: null
  },
  'second': {
    id: 'second',
    title: 'Second',
    // template isn't required, so 'text' will be used
    // some way to define templates and store them is needed
      type: 'text',
    // not required
    isSortable: false,
    isEditable: true,
    minWidth: 100,
    width: null
  }, 'third': {
    id: 'third',
    title: 'third',
    // template isn't required, so 'text' will be used
    // some way to define templates and store them is needed
    type: 'text',
    // not required
    isSortable: false,
    isEditable: true,
    minWidth: 100,
    width: null
  }
};

let columns = ['id', 'second', 'third'];

let headerRows = [['11', 'header', 'row'], ['1122', 'header2', 'row']];
let rows = [['3', 'qqq', 'rrr'], ['1', 'wwww', 'ttt'], ['2', 'rrrr', 'yyy'], ['31', 'rrrr', 'yyy'], ['32', 'rrrr', 'yyy'],
  ['33', 'rrrr', 'yyy'], ['34', 'rrrr', 'yyy'], ['35', 'rrrr', 'yyy'], ['36', 'rrrr', 'yyy'], ['37', 'rrrr', 'yyy'],
  ['38', 'rrrr', 'yyy'], ['39', 'rrrr', 'yyy'], ['30', 'rrrr', 'yyy'], ['311', 'rrrr', 'yyy'], ['322', 'rrrr', 'yyy'],
  ['333', 'rrrr', 'yyy'], ['344', 'rrrr', 'yyy'], ['355', 'rrrr', 'yyy'], ['366', 'rrrr', 'yyy'], ['377', 'rrrr', 'yyy']];

let footerRows = [['222', 'footer', 'row'], ['22233', 'footer2', 'row2']];

let data = {headerRows, rows, footerRows};

let grid = new Grid({config, schema, columns, data});

grid.renderGrid();

//grid.setColumns(['second'], ['id']);
