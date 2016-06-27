"use strict";

import React from 'react';

export default class Templates {
  constructor(data) {
    this.data = data;

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
        writableTemplate: <div className="wrapper"><div className="text"><input type="text" value={this.data} /></div></div>,
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
}
