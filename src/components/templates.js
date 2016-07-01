"use strict";

import React from 'react';

const MIN_WIDTH = 100;

// TODO ability to add custom columns(or redefine existing)
export default class Templates {
  constructor(options) {
    this.data = options.data;
    this.onValueChange = options.onValueChange;
    this.styles = options.styles;

    let columnStyle = {};

    // calculate column width
    if (this.styles.width) {
      columnStyle.width = this.styles.width + 'px';
    }
    else if (this.styles.minWidth) {
      columnStyle.minWidth = this.styles.minWidth + 'px';
    } else {
      columnStyle.minWidth = MIN_WIDTH + 'px';
    }

    //if
// TODO move actions and checkbox template here
    this.columnTypes = {
      number: {
        template: <div style={columnStyle}>{this.data}</div>,
        footerTemplate: <div style={columnStyle}>{this.data}</div>,
        headerTemplate: <div style={columnStyle}>{this.data}</div>,
        writableTemplate: <div style={columnStyle}>{this.data}</div>,
        type: 'number'
      },
      currency: {
        template: <div style={columnStyle}>{this.data}</div>,
        footerTemplate: <div style={columnStyle}>{this.data}</div>,
        headerTemplate: <div style={columnStyle}>{this.data}</div>,
        writableTemplate: <div style={columnStyle}>{this.data}</div>,
        type: 'number'
      },
      percent: {
        template: <div style={columnStyle}>{this.data}</div>,
        footerTemplate: <div style={columnStyle}>{this.data}</div>,
        headerTemplate: <div style={columnStyle}>{this.data}</div>,
        writableTemplate: <div style={columnStyle}>{this.data}</div>,
        type: 'number'
      },
      date: {
        template: <div style={columnStyle}>{this.data}</div>,
        footerTemplate: <div style={columnStyle}>{this.data}</div>,
        headerTemplate: <div style={columnStyle}>{this.data}</div>,
        writableTemplate: <div style={columnStyle}>{this.data}</div>,
        type: 'date'
      },
      text: {
        template: <div style={columnStyle}>{this.data}</div>,
        footerTemplate: <div style={columnStyle}>{this.data}</div>,
        headerTemplate: <div style={columnStyle}>{this.data}</div>,
        writableTemplate: (
          <div style={columnStyle}>
            <input type="text" defaultValue={this.data} onChange={this.onValueChange} />
          </div>),
        type: 'string'
      },
      actions: {
        type: 'actions'
      },
      select: {
        type: 'select'
      }
    };
  }

  getTemplate = (type) => {
    return this.columnTypes[type];
  };

  /*handleChange(evt) {
    let that = this;
    console.log(that);
    console.log(evt.target.value);
  }*/
}
