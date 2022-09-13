import React from "react";

class ProposalHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h2 className="ui header">{this.props.header?.split('\n')[0]}</h2>
                <p>{this.props.header?.split('\n')[1]}</p>
            </div>
        )
    }
}

export default ProposalHeader
