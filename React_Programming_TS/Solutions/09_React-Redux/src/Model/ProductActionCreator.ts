// ProductActionCreator.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// THe action-creator for the production actions. Because of the asynchronouse nature of the actions, instead of bindActionCreators
// these methods must call dispatch themselves. So, connect is used to bind 
//

import { Dispatch } from 'redux';

import dataContext from '../Data-Access/dataContext';
import ModelAction, { ProductActionType, createModelAction } from './ModelAction';

class ProductActionCreator {

    private dispatch: Dispatch<ModelAction>;

    constructor(dispatch: Dispatch<ModelAction>) {

        this.dispatch = dispatch;
    }

    public async getBeverages(): Promise<void> {

        try {

            const beverages = await dataContext.beverageContext.getBeverages();

            this.dispatch(createModelAction(ProductActionType.SET_BEVERAGES_ACTION, beverages));
        }

        catch (error) {

            console.log(error)
            this.dispatch(createModelAction(ProductActionType.SET_BEVERAGES_ERROR_ACTION));
        }
    }

    public async getPastries(): Promise<void> {

        try {

            const pastries = await dataContext.pastryContext.getPastries();

            this.dispatch(createModelAction(ProductActionType.SET_PASTRIES_ACTION, pastries));
        }

        catch (error) {

            console.log(error)
            this.dispatch(createModelAction(ProductActionType.SET_PASTRIES_ERROR_ACTION));
        }
    }
}

export default ProductActionCreator;