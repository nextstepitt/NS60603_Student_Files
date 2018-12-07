// ModelStoreController.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { combineReducers, createStore, Store } from 'redux';

import Cart from '../Cart/Cart';
import CartReducer from './CartReducer';
import ModelAction from './ModelAction';
import ModelState from './ModelState';
import Product from '../Data-Access//Product';
import ProductReducer from './ProductReducer';

class ModelStoreController {

    private reduxStore: Store<ModelState, ModelAction>;

    public constructor() {

        const cartReducer: CartReducer = new CartReducer();
        const productReducer: ProductReducer = new ProductReducer();
        const mapReducersToModelState = { products: productReducer.reduce, cart: cartReducer.reduce }

        this.reduxStore = createStore(combineReducers<ModelState>(mapReducersToModelState), this.initialState)
    }

    public get store(): Store<ModelState, ModelAction> {

        return this.reduxStore;
    }

    public get initialState(): ModelState {

        const defineState: ModelState = {

            products: {

                beverages: new Array<Product>(),
                beveragesError: false,
                pastries: new Array<Product>(),
                pastriesError: false
            },

            cart: new Cart()
        }

        return defineState;
    }
}

export default ModelStoreController;