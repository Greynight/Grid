/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';

import Grid from './components/grid';

let config = {
  parentId: 'grid',
  showHeader: true,
  showFooter: true,
  enableSelection: true
};

let schema = {
  'id': {
    id: 'id',
      title: 'Id',
    // template isn't required, so 'text' will be used
    // some way to define templates and store them is needed
    template: 'text',
    // not required
    isSortable: false
  },
  'second': {
  id: 'second',
  title: 'Second',
  // template isn't required, so 'text' will be used
  // some way to define templates and store them is needed
  template: 'text',
  // not required
  isSortable: false
}, 'third': {
    id: 'third',
    title: 'third',
    // template isn't required, so 'text' will be used
    // some way to define templates and store them is needed
    template: 'text',
    // not required
    isSortable: false
  }};

let grid = new Grid({config, schema});

let columns = ['id', 'second', 'third'];

let headerRows = [['11', 'header', 'row']];
let rows = [['1', 'qqq', 'rrr'], ['2', 'wwww', 'ttt'], ['3', 'rrrr', 'yyy']];
let footerRows = [['222', 'footer', 'row']];

grid.setColumns(columns);
grid.setData({headerRows, rows, footerRows});

grid.renderGrid();


//grid.setColumns(['second'], ['id']);
