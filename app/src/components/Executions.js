import {Table} from "semantic-ui-react";
import React from "react";
import {DrizzleContext} from "@drizzle/react-plugin";
import {ProposalDecoratorContext} from "../proposalDecoratorContext";

class Executions extends React.Component {
    static contextType = DrizzleContext.Context
    constructor(props) {
        super(props);
        this.state = {data:[{id:12345, title:'dfff'}]}

        this.handleQueue = this.handleQueue.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
    }


    handleQueue(e, id) {
        this.context.drizzle.contracts.TransDAOGovernor.methods.queue(id).send()
        e.preventDefault()
    }

     handleExecute(e,id) {
         this.context.drizzle.contracts.TransDAOGovernor.methods.execute(id).send()
        e.preventDefault()
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
        const succeded = await Promise.all(events.map(async (e) => {
                return {
                    title: e.returnValues.description,
                    state: await drizzle.contracts.TransDAOGovernor.methods.state(e.returnValues.proposalId).call(),
                    id: e.returnValues.proposalId,
                    shortId: e.returnValues.proposalId.substring(0, 6),
                }
            }, []))
        this.setState({data: succeded.filter(e=> e.state === '4' || e.state === '5')})
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
                                        <div className="header">Proposals to Queued & Executed</div>
                                        <div className="description">
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Id</Table.HeaderCell>
                                                <Table.HeaderCell>Proposal</Table.HeaderCell>
                                                <Table.HeaderCell>To Queue</Table.HeaderCell>
                                                <Table.HeaderCell>To Execute</Table.HeaderCell>

                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.state.data.map((proposal) => {
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell>{proposal.shortId}</Table.Cell>
                                                        <Table.Cell>{proposal.title}</Table.Cell>
                                                        <Table.Cell>
                                                            <button onClick={(e)=>this.handleQueue(e,proposal.id)} disabled={proposal.state === '5'} className="ui button">Queue</button>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <button onClick={(e)=>this.handleExecute(e,proposal.id)} disabled={proposal.state === '4'} className="ui button">Execute</button>
                                                        </Table.Cell>

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
export default Executions
