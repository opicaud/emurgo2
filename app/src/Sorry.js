import React from "react";

import {Container, Dropdown, Image, Menu} from "semantic-ui-react";

class Sorry extends React.Component {
    render() {
        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item header>
                            {"TransDAO " + require('../package.json').version}
                        </Menu.Item>
                    </Container>
                </Menu>
                <Container text style={{marginTop: '7em'}}>
                    <h1>Sorry ..</h1>
                    Your web3 wallet has not been detected
                    <p/>
                    Please install Metamask from https://metamask.io/download/
                    <p/>
                    Please also add the demo.transdao.trackclear.be:8545 network and chainId 1339
                    <p/>
                    See https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC for help
                </Container>
            </div>
        )
    }
};

export default Sorry
