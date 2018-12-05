// ProductActionCreator.js
// Copyright © NextStep IT Training. All rights reserved.
//
// THe action-creator for the production actions. Because of the asynchronouse nature of the actions, instead of bindActionCreators
// these methods must call dispatch themselves. So, connect is used to bind 
//

import { Dispatch } from 'redux';

import dataContext from '../Data-Access/dataContext';
import ModelAction, { SET_BEVERAGES_ACTION, SET_BEVERAGES_ERROR_ACTION, SET_PASTRIES_ACTION, SET_PASTRIES_ERROR_ACTION } from './ModelAction';

export default class ProductActionCreator {

    private dispatch: Dispatch;

    constructor(dispatch: Dispatch) {

        this.dispatch = dispatch;
    }

    public async getBeverages(): Promise<void> {

        try {

            const beverages = await dataContext.beverageContext.getBeverages();

            this.dispatch(new ModelAction(SET_BEVERAGES_ACTION, beverages));
        }

        catch (error) {

            console.log(error)
            this.dispatch(new ModelAction(SET_BEVERAGES_ERROR_ACTION));
        }
    }

    getPastries() {

        try {

            const pastries = await dataContext.pastryContext.getPastries();

            this.dispatch(new ModelAction(SET_PASTRIES_ACTION, pastries));
        }

        catch (error) {

            console.log(error)
            this.dispatch(new ModelAction(SET_PASTRIES_ERROR_ACTION));
        }
    }
}