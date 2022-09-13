import {Table} from "semantic-ui-react";
import React from "react";
import {DrizzleContext} from "@drizzle/react-plugin";
import {ProposalDecoratorContext} from "../proposalDecoratorContext";
import {Link} from "react-router-dom";

class Proposals extends React.Component {
    static contextType = DrizzleContext.Context
    constructor(props) {
        super(props);
        this.state = {
            data: [{style: '', title: '', state: '0', id: ''}]
        };

    }

    async componentDidMount() {
        this.drizzle = this.context.drizzle
        await this.transform(this.drizzle);
        this.unsubscribe = this.drizzle.store.subscribe(async () => {
            await this.transform(this.drizzle);
        })
    }

    async transform(drizzle) {
        const events = drizzle.store.getState().contracts.TransDAOGovernor.events ?? []
        this.setState({
            data: await Promise.all(events.map(async (e) => {
                return {
                    style: '',
                    title: e.returnValues.description,
                    state: await drizzle.contracts.TransDAOGovernor.methods.state(e.returnValues.proposalId).call(),
                    id: e.returnValues.proposalId,
                    shortId: e.returnValues.proposalId.substring(0, 6),
                }
            }, []))
        })
    }

    async componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        return (
            <DrizzleContext.Consumer>
                {() => {
                    return(
                        <ProposalDecoratorContext.Consumer>
                            {decorator => {
                                return (
                                    <div className="content">
                                        <div className="header">Current Proposals</div>
                                        <div className="description">
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Id</Table.HeaderCell>
                                                <Table.HeaderCell>Proposal</Table.HeaderCell>
                                                <Table.HeaderCell>State</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.state.data.map((event) => {
                                                return (
                                                    <Table.Row className={event.style}>
                                                        <Table.Cell>
                                                            <Link to={`/proposal/${event.id}`} key={event.id}>{event.shortId}</Link>
                                                        </Table.Cell>
                                                        <Table.Cell>{event.title}</Table.Cell>
                                                        <Table.Cell>{decorator[event.state].stateForHuman}</Table.Cell>
                                                    </Table.Row>)
                                            })}
                                        </Table.Body>
                                    </Table>
                                        </div>
                                    </div>
                                )}}
                        </ProposalDecoratorContext.Consumer>
                    )}}
            </DrizzleContext.Consumer>)
    }
}
export default Proposals
