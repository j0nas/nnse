import React, {Component} from "react";

export default class GenerateInvoiceCSV extends Component {
    render() {
        return (
            <form className="container-fluid" action="/api/makecsv" method="get">
                <button className="btn btn-primary" type="submit">Generér faktura</button>
            </form>
        );
    }
}
