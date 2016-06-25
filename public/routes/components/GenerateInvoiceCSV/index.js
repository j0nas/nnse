import React, {Component} from "react";

export default class GenerateInvoiceCSV extends Component {
    constructor() {
        super();
        this.generateInvoiceCSV = this.generateInvoiceCSV.bind(this);
    }

    generateInvoiceCSV() {
        fetch("/api/makecsv");
        console.log("Requested");
    }

    render() {
        return (
            <div className="container-fluid">
                <button className="btn btn-primary" onClick={this.generateInvoiceCSV}>Generér faktura</button>
            </div>
        );
    }
}
