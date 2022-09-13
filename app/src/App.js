import React from "react";
import "./App.css";
import {useNavigate, useParams} from "react-router-dom";
import {DrizzleContext} from "@drizzle/react-plugin";
import {Container, Dropdown, Image, Menu} from "semantic-ui-react";
import drizzleOptions from "./drizzleOptions";
import store from './middleware'
import {Drizzle} from "@drizzle/store";
import Sorry from "./Sorry";
import Funds from "./components/Funds";

const drizzle = new Drizzle(drizzleOptions, store);

const App = ({children}) => {
    let navigator = useNavigate();
    let params = useParams()

    function navigateTo(to) {
        navigator(to)
    }

    return (
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const {drizzle, drizzleState, initialized} = drizzleContext;

                    if (!initialized) {
                        return <Sorry/>
                    }
                    return (
                        <div>
                            <Menu fixed='top' inverted>
                                <Container>
                                    <Menu.Item onClick={() => navigateTo('/')} as='a' header>
                                        {"TransDAO " + require('../package.json').version}
                                    </Menu.Item>
                                    <Dropdown item simple text='DAO'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => navigateTo('/onboarding')}>On
                                                Boarding</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Menu.Item position="right" >
                                        <Funds drizzle={drizzle}/>
                                    </Menu.Item>
                                </Container>


                            </Menu>

                            <Container text style={{marginTop: '7em'}}>
                                {React.cloneElement(children, {id: params.proposalId})}
                            </Container>
                        </div>
                    )
                }}
            </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
    )
}

export default App;
