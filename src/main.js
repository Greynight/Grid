/**
 * App entry point
 */
// TODO check if we need include libraries
// Polyfill
//import 'babel-polyfill';

// Libraries
//import React from 'react';

import Grid from './components/grid';

let config = {
  parentId: 'grid',
  showHeader: true,
  showFooter: true,
  enableSelection: true,
  enableEditing: false
};

let schema = {
  'id': {
    id: 'id',
      title: 'Id',
    // template isn't required, so 'text' will be used
    // some way to define templates and store them is needed
    type: 'text',
    // not required
    isSortable: false
  },
  'second': {
  id: 'second',
  title: 'Second',
  // template isn't required, so 'text' will be used
  // some way to define templates and store them is needed
    type: 'text',
  // not required
  isSortable: false
}, 'third': {
    id: 'third',
    title: 'third',
    // template isn't required, so 'text' will be used
    // some way to define templates and store them is needed
    type: 'text',
    // not required
    isSortable: false
  }
};

let columns = ['id', 'second', 'third'];

let headerRows = [['11', 'header', 'row']];
let rows = [['1', 'qqq', 'rrr'], ['2', 'wwww', 'ttt'], ['3', 'rrrr', 'yyy']];
let footerRows = [['222', 'footer', 'row']];

let data = {headerRows, rows, footerRows};

/*grid.setColumns(columns);
grid.setData({headerRows, rows, footerRows});*/

let grid = new Grid({config, schema, columns, data});

grid.renderGrid();


//grid.setColumns(['second'], ['id']);
