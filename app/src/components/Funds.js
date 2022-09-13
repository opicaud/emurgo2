import React from "react";

class Funds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {balance: 0}
    }

   async componentDidMount() {
        const address = this.props.drizzle.contracts.TransDAOFunds.address
        const balance = await this.props.drizzle.web3.eth.getBalance(address)
        this.setState({'balance': this.props.drizzle.web3.utils.fromWei(balance)})
    }

    render() {
        return(
            <div>TransDAOFunds: {this.state.balance ?? 0} ETH</div>
        )
   }
}

export default Funds
