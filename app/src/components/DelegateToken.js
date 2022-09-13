import React from "react";
import {DrizzleContext} from "@drizzle/react-plugin";

class Delegate extends React.Component {
    static contextType = DrizzleContext.Context

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            address: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
    }


    handleChangeAddress(event) {
        this.setState({address: event.target.value});
    }

    handleSubmit(event){
        this.context.drizzle.contracts.TransDAO.methods.delegate(this.state.address).send()
        event.preventDefault();
    }



    render() {
        return (
            <DrizzleContext.Consumer>
                {() => {
                    return (
                        <div className="ui items">
                            <div className="item">
                                <div className="content">
                                    <div className="header">Delegate TransDAO Tokens</div>
                                    <div className="description">
                                        <p>Delegate your token to weigh your vote</p>
                                    </div>
                                    <p></p>
                                    <form className="ui form">
                                        <div className="field">
                                            <div className="two fields">
                                                <div className="field">
                                                    <input value={this.state.address}
                                                           onChange={this.handleChangeAddress} type="text"
                                                           placeholder="0xB36089869623Ddb5B7991a7A6a574a4bC5397F08"/>
                                                </div>
                                                <div onClick={this.handleSubmit} className="ui button"
                                                     tabIndex="0">Delegate
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    )
                }
                }
            </DrizzleContext.Consumer>
        )}
}

export default Delegate
