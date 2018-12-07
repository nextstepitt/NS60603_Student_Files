// ModelState.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { combineReducers, createStore, Store } from 'redux'

import Cart from '../Cart/Cart';
import Products from './Products';

class State {

    public products: Products = new Products();
    public cart: Cart = new Cart();
}

export default State;