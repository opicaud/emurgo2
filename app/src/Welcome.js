import React from "react";
import Proposals from "./components/Proposals";
import Executions from "./components/Executions";
import DelegateToken from "./components/DelegateToken";

export default () => {
    return (
        <div className="ui items">
            <div className="item">
                <DelegateToken></DelegateToken>
            </div>
            <div className="item">
                <Proposals></Proposals>
            </div>
            <div className="item">
                <Executions></Executions>
            </div>
        </div>
    )
};
