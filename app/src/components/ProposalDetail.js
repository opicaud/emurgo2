import React from "react";
import ProposalHeader from "./proposal/ProposalHeader";
import ProposalVote from "./proposal/ProposalVote";
import ProposalSpecifications from "./proposal/ProposalSpecifications";
import {DrizzleContext} from "@drizzle/react-plugin";

class ProposalDetail extends React.Component {
    static contextType = DrizzleContext.Context

    constructor(props) {
        super(props);
        this.state = {
            id: props.id
        }


    }

    async componentDidMount() {
        this.drizzle = this.context.drizzle
        this.drizzleState = this.context.drizzleState
        await this.transform(this.drizzle,this.drizzleState);
        this.unsubscribe = this.drizzle.store.subscribe(async () => {
            await this.transform(this.drizzle, this.drizzleState);
        })

    }

     componentWillUnmount() {
        this.unsubscribe()
    }


    async transform(drizzle, drizzleState) {
        const events = drizzle.store.getState().contracts.TransDAOGovernor.events
        const proposal = events.filter((e) =>e.returnValues.proposalId === this.state.id)['0']
        const state = await drizzle.contracts.TransDAOGovernor.methods.state(this.state.id).call()
        await this.setState({
                    header: proposal?.returnValues.description,
                    description: proposal?.returnValues.description,
                    proposer: proposal?.returnValues.proposer,
                    state: state,
                    voteStart: proposal?.returnValues.startBlock,
                    voteEnd: proposal?.returnValues.endBlock,

            }
        )
        if(proposal !== undefined) {
            const quorumProposal = await drizzle.contracts.TransDAOGovernor.methods.quorum(proposal.returnValues.startBlock).call()
            const quorum = await drizzle.contracts.TransDAO.methods.getPastVotes(drizzleState.accounts[0], proposal.returnValues.startBlock).call()
            const unit = await drizzle.contracts.TransDAO.methods.symbol().call()

            await this.setState({
                quorum: parseFloat(drizzle.web3.utils.fromWei(quorum,'ether')).toFixed(3) + ' ' + unit,
                quorumProposal: parseFloat(drizzle.web3.utils.fromWei(quorumProposal, 'ether')).toFixed(3) + ' ' + unit
            })
        }
     }


    render() {
        return (
            <DrizzleContext.Consumer>
                {() => {
                    return (
                        <div className="ui raised very padded text container segment">
                            <ProposalHeader header={this.state.header}/>
                            <p/>
                            <ProposalVote id={this.state.id}
                                          state={this.state.state}
                                          quorum={this.state.quorum}
                            />
                            <p/>
                            <ProposalSpecifications proposer={this.state.proposer}
                                                    quorumProposal={this.state.quorumProposal}
                                                    state={this.state.state}
                                                    voteStart={this.state.voteStart}
                                                    voteEnd={this.state.voteEnd}/>
                        </div>

                    )
                }}
            </DrizzleContext.Consumer>
        )
    }
}

export default ProposalDetail
