import React from "react";

export const decorator = {
    '0': {
        stateForHuman: 'Pending',
    },
    '1': {
        stateForHuman: 'Active',
    },
    '3':{
        stateForHuman: 'Defeated',
    },
    '4':{
        stateForHuman: 'Succeeded'
    },
    '5':{
        stateForHuman: 'Queued'
    },
    '7':{
        stateForHuman: 'Executed'
    }

};

export const ProposalDecoratorContext = React.createContext(
    decorator // valeur par défaut
);
