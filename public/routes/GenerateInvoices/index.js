import React, {Component} from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import GenerateInvoiceCSV from "../components/GenerateInvoiceCSV";

export default class GenerateInvoices extends Component {
    render() {
        return (
            <ContentBox>
                <GenerateInvoiceCSV />
            </ContentBox>
        );
    }
}
