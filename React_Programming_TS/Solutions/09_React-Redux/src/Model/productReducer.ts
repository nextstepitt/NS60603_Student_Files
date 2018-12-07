// ProductReducer.ts
// Copyright © NextStep IT Training. All rights Reserved.
//

import { AnyAction } from 'redux';
import ModelAction, { ProductActionType } from './ModelAction';
import ModelState from './ModelState';
import Product from '../Data-Access/Product';
import Products from './Products';

class ProductReducer {

    public constructor() {

        this.reduce = this.reduce.bind(this)
    }

    public reduce(state: Products | undefined, action: AnyAction): Products {

        let resultState: Products = state ? state : new Products();

        switch (action.type) {

            case ProductActionType.SET_BEVERAGES_ACTION:
                resultState = this.reduceBeverages(state, action.payload);
                break;

            case ProductActionType.SET_BEVERAGES_ERROR_ACTION:
                resultState = this.reduceBeveragesError(state);
                break;

            case ProductActionType.SET_PASTRIES_ACTION:
                resultState = this.reducePastries(state, action.payload);
                break;

            case ProductActionType.SET_PASTRIES_ERROR_ACTION:
                resultState = this.reducePastriesError(state);
                break;

            default:
                break;
        }

        return resultState;
    }

    private reduceBeverages(state: Products | undefined, beverages: Array<Product>): Products {

        let result = new Products(state);

        result.beverages = beverages;
        result.beveragesError = false;

        return result;
    }

    private reduceBeveragesError(state: Products | undefined): Products {

        let result = new Products(state);

        result.beverages = [];
        result.beveragesError = true;

        return result;
    }

    private reducePastries(state: Products | undefined, pastries: Array<Product>): Products {

        let result = new Products(state);

        result.pastries = pastries;
        result.pastriesError = false;

        return result;
    }

    private reducePastriesError(state: Products | undefined): Products {
 
        let result = new Products(state);

        result.pastries = new Array<Product>();
        result.pastriesError = false;

        return result;
    }
}

export default ProductReducer;