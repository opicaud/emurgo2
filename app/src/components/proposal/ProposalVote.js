import React from "react";
import {ProposalDecoratorContext} from "../../proposalDecoratorContext";
import {DrizzleContext} from "@drizzle/react-plugin";

class ProposalVote extends React.Component {
    static contextType = DrizzleContext.Context

    constructor(props) {
        super(props);

    }

    handleClick(vote, e) {
        this.context.drizzle.contracts.TransDAOGovernor.methods.castVote(this.props.id, vote).send()
        e.preventDefault();
    }



    isActive(decorator) {
        return decorator[1].stateForHuman === decorator[this.props.state]?.stateForHuman;
    }


    render() {
        return (
            <DrizzleContext.Consumer>
                {() => {
                    return (
                        <ProposalDecoratorContext.Consumer>
                            {decorator => {
                                if (this.isActive(decorator)) {
                                    return (
                                        <div>
                                            <h4 className="ui horizontal divider header">
                                                <i className="bullhorn icon"></i>
                                                Vote
                                            </h4>

                                    <div className="extra content">
                                        <label>Your weight: {this.props.quorum}</label>
                                        <div className="ui three buttons">
                                                <div onClick={(e) => this.handleClick(1, e)}
                                                     className="ui basic green button">For
                                                </div>
                                                <div onClick={(e) => this.handleClick(2, e)}
                                                     className="ui basic blue button">Abstain
                                                </div>
                                                <div onClick={(e) => this.handleClick(0, e)}
                                                     className="ui basic red button">Against
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                }
                            }}
                        </ProposalDecoratorContext.Consumer>
                    )
                }}</DrizzleContext.Consumer>
        )
    }


}

export default ProposalVote
