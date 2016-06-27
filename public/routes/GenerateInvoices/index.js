import React, {Component} from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import GenerateInvoiceCSV from "../components/GenerateInvoiceCSV";
import EntityTable from "../components/ContentTable/EntityTable";
import FormEntities from "../EntityForm/FormEntities";
import EntityFormatter from "../components/ContentTable/EntityFormatter";

export default class GenerateInvoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leases: []
        };
    }

    componentDidMount() {
        fetch('/api/leases')
            .then(data => data.json())
            .then(entities => this.setState({leases: entities}));
    }

    render() {
        const entityObject = FormEntities.getEntityObject("/leases");
        const formattedEntities = EntityFormatter.formatEntities(this.state.leases, entityObject);

        return (
            <ContentBox title="Fakturagenerering">
                <EntityTable entityObject={entityObject} entities={formattedEntities}/>
                <GenerateInvoiceCSV />
            </ContentBox>
        );
    }
}
