import React from "react";
import {ProposalDecoratorContext} from "../../proposalDecoratorContext";

class ProposalSpecifications extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <ProposalDecoratorContext.Consumer>
                {decorator => {
                    return(

            <div>
            <h4 className="ui horizontal divider header">
                <i className="bar chart icon"></i>
                Specifications
            </h4>
        <table className="ui definition table">
            <tbody>
            <tr>
                <td>Proposer</td>
                <td>{this.props.proposer}</td>
            </tr>
            <tr>
                <td>Quorum</td>
                <td>{this.props.quorumProposal}</td>
            </tr>
            <tr>
                <td>State</td>
                <td>{decorator[this.props.state]?.stateForHuman}</td>
            </tr>
            <tr>
                <td>Vote Start</td>
                <td>{this.props.voteStart}</td>
            </tr>
            <tr>
                <td>Vote end</td>
                <td>{this.props.voteEnd}</td>
            </tr>
            </tbody>
        </table>
            </div>
                    )}
                }
            </ProposalDecoratorContext.Consumer>
        )
    }
}

export default ProposalSpecifications
