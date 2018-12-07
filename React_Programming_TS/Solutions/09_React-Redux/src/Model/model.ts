// model.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { combineReducers, createStore, Store } from 'redux'

import Cart from '../Cart/Cart';
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import Products from './Products';

class Store {

    public products: Products = new Products();
    public cart: Cart = new Cart();
}

class ReduxModel {

    private _store: Store;

    public constructor() {

        let reducer = combineReducers( { products: productReducer, cart: cartReducer } )
        this._store = createStore(reducer, this.initialState)
    }

    public get store(): Store {

        return this._store
    }

    public get initialState(): Store {

        return {

            products: {

                beverages: [],
                pastries: []
            },

            cart: new cart()
        }
    }
}

export default (new ReduxModel());
export { Store };