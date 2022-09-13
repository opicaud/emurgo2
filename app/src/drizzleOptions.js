import Web3 from "web3";
import TransDAO from "./contracts/TransDAO.json";
import Hiring from "./contracts/Hiring.json"
import TransDAOGovernor from "./contracts/TransDAOGovernor.json"
import TransDAOFunds from "./contracts/TransDAOFunds.json"

const options = {
  web3: {
    block: false,
    customProvider:new Web3(Web3.givenProvider)},
  contracts: [TransDAO, Hiring, TransDAOGovernor, TransDAOFunds],
  events: {
    TransDAOGovernor: [{eventName: 'ProposalCreated', eventOptions: {fromBlock: 0}}]
  },
};

export default options;
