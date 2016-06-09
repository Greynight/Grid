"use strict";

// selection
// inline editing
// sorting(internal/external)
// pagination(internal/external)
// search(internal/external)

// Components
/*
grid
    headerRows
        headerRow
            selectAllCell
            headerCell
    rows
        row
            selectCell
            cell
    footerRows
        footerRow
            footerCell
*/

class Grid {

    constructor(config = {}) {
        let config = {
            parentId: 'grid',
            showHeader: true,
            showFooter: true
        };

        // columns list
        this.columns = [];
        // columns structure
        this.schema = [];


        this.setConfig(config);

    }

    render() {
        ReactDOM.render(
        <FilterableProductTable products={PRODUCTS} />,
          document.getElementById('container')
        );
    }

    setConfig(config = {}) {
        this.config = config;
    }

    clearConfig() {
        // TODO
        this.config = false;
    }

    setSchema(schema = []) {
        let schema = [{
            id: 'id',
            title: 'Id',
            // template isn't required, so 'text' will be used
            // some way to define templates and store them is needed
            template: 'text',
            // not required
            isSortable: false
        }, {
            id: 'second',
            title: 'Second',
            // template isn't required, so 'text' will be used
            // some way to define templates and store them is needed
            template: 'text',
            // not required
            isSortable: false
        }];

        this.schema = schema;
    }



    clearSchema() {
        this.schema.length = 0;
    }

    setColumns(columns = []) {
        let columns = ['id', 'second'];
    }

    clearColumns() {
        this.columns.length = 0;
    }

    getColumns() {
        return this.columns;
    }

    setData(rows = []) {
        /*if (this.getColumns().length !== rows[0].length) {
            through new Error("Number of columns isn't equal to number of cells in a row");
        }*/

    }

    getData() {

    }

    clearData() {

    }

    isEmpty() {

    }

}

export default Grid;
