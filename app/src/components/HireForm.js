import React from "react";
import {Button, Form, TextArea} from "semantic-ui-react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Navigate } from "react-router-dom"

class HireForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            address: '',
            tellus: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeTellUs = this.handleChangeTellUs.bind(this);


    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeAddress(event) {
        this.setState({address: event.target.value});
    }

    handleChangeTellUs(event) {
        this.setState({tellus: event.target.value});
    }

    handleSubmit(event,drizzle) {
        const calldata=drizzle.contracts.Hiring.methods.hire(this.state.address).encodeABI();
        drizzle.contracts.TransDAOGovernor.methods.propose([drizzle.contracts.Hiring.address], [0], [calldata], this.state.title + '\n' + this.state.tellus).send()
        this.setState({redirect: true})
        event.preventDefault();
    }

    render() {
        return (
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle } = drizzleContext;
                    if (this.state.redirect) {
                        return <Navigate to='/'/>;
                    }
                    return (

                        <div>
                            <h1>OnBoarding</h1>
                            <Form onSubmit={(e)=>this.handleSubmit(e,   drizzle)}>
                                <Form.Field>
                                    <label>Proposal</label>
                                    <input value={this.state.title} onChange={this.handleChangeTitle} placeholder='Hire John Doe' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Address</label>
                                    <input value={this.state.address} onChange={this.handleChangeAddress} placeholder='0xB36089869623Ddb5B7991a7A6a574a4bC5397F08' />
                                </Form.Field>
                                <Form.Field>
                                    <TextArea value={this.state.tellus} onChange={this.handleChangeTellUs} placeholder='Tell us more about John' />
                                </Form.Field>
                                <Button type='submit'>Propose</Button>
                            </Form>

                        </div>)}}
            </DrizzleContext.Consumer>
        );
    }
}

export default HireForm
