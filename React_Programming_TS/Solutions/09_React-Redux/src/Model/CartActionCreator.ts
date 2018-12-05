// CartActionCreator.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// The action-creator for the production actions. Because of the asynchronouse nature of the actions, instead of bindActionCreators
// these methods must call dispatch themselves. So, connect is used to bind 
//

import { Dispatch } from 'redux';

import CartEntry from '../Cart/CartEntry';
import ModelAction, { ADD_CART_ITEM_ACTION, CLEAR_CART_ITEMS_ACTION, REMOVE_CART_ITEM_ACTION } from './ModelAction';

class CartActionCreator {

    private dispatch: Dispatch;

    public constructor(dispatch: Dispatch) {

        this.dispatch = dispatch;
    }

    public addCartEntry(entry: CartEntry): void {

        this.dispatch(new ModelAction(ADD_CART_ITEM_ACTION, entry));
    }

    public clearCart(): void {

        this.dispatch(new ModelAction(CLEAR_CART_ITEMS_ACTION));
    }

    public removeCartEntry(entry: CartEntry): void {

        this.dispatch(new ModelAction(REMOVE_CART_ITEM_ACTION, entry));
    }
}

export default CartActionCreator;