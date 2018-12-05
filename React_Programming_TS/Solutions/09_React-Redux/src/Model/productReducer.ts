// productReducer.ts
// Copyright © NextStep IT Training. All rights Reserved.
//

import ModelAction, { SET_BEVERAGES_ACTION, SET_BEVERAGES_ERROR_ACTION, SET_PASTRIES_ACTION, SET_PASTRIES_ERROR_ACTION } from './ModelAction'
import Product from '../Data-Access/Product';
import Products from './Products';

class ProductReducer {

    constructor() {

        this.reduce = this.reduce.bind(this)
    }

    reduce(state: Products, action: ModelAction) {

        let result = state ? state : new Products();

        switch (action.type) {

            case SET_BEVERAGES_ACTION:
                result = this.reduceBeverages(result, action.data);
                break;

            case SET_BEVERAGES_ERROR_ACTION:
                result = this.reduceBeveragesError(result);
                break;

            case SET_PASTRIES_ACTION:
                result = this.reducePastries(result, action.data);
                break;

            case SET_PASTRIES_ERROR_ACTION:
                result = this.reducePastriesError(result);
                break;

            default:
                break;
        }

        return result;
    }

    public reduceBeverages(state: Products, beverages: Array<Product>): Products {

        let result = { ...state };

        result.beverages = beverages;
        result.beveragesError = false;

        return result;
    }

    reduceBeveragesError(state: Products) {

        let result = { ...state };

        result.beverages = [];
        result.beveragesError = true;

        return result;
    }

    reducePastries(state: Products, pastries: Array<Product>) {

        let result = { ...state };

        result.pastries = pastries;
        result.pastriesError = false;

        return result;
    }

    reducePastriesError(state: Products) {
 
        let result = { ...state };

        result.pastries = [];
        result.pastriesError = false;

        return result;
    }
}

export default (new ProductReducer()).reduce;