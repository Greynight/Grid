"use strict";

import React from 'react';

// TODO ability to add custom columns(or redefine existing)
export default class Templates {
  constructor(options) {
    this.data = options.data;
    this.onValueChange = options.onValueChange;

    this.columnTypes = {
      number: {
        template: <div className="wrapper"><div className="text">{this.data}</div></div>,
        footerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        headerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        writableTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        type: 'number'
      },
      currency: {
        template: <div className="wrapper"><div className="text">{this.data}</div></div>,
        footerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        headerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        writableTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        type: 'number'
      },
      percent: {
        template: <div className="wrapper"><div className="text">{this.data}</div></div>,
        footerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        headerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        writableTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        type: 'number'
      },
      date: {
        template: <div className="wrapper"><div className="text">{this.data}</div></div>,
        footerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        headerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        writableTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        type: 'date'
      },
      text: {
        template: <div className="wrapper"><div className="text">{this.data}</div></div>,
        footerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        headerTemplate: <div className="wrapper"><div className="text">{this.data}</div></div>,
        writableTemplate: (
          <div className="wrapper">
            <div className="text">
              <input type="text" defaultValue={this.data} onChange={this.onValueChange} />
            </div>
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
