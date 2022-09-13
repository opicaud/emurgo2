import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'semantic-ui-css/semantic.min.css'

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import onBoarding from "./OnBoarding";
import Welcome from "./Welcome";
import Proposal from "./Proposal";
import ProposalDetail from "./components/ProposalDetail";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App children={Welcome()}/>} />
            <Route path="/proposal/:proposalId" element={<App children={Proposal()}/>} />
            <Route path="/onboarding" element={<App children={onBoarding()} />} />

        </Routes>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();