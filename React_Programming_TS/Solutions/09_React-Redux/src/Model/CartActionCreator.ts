// CartActionCreator.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// The action-creator for the production actions. Because of the asynchronouse nature of the actions, instead of bindActionCreators
// these methods must call dispatch themselves. So, connect is used to bind 
//

import { Dispatch } from 'redux';

import CartEntry from '../Cart/CartEntry';
import ModelAction, { CartActionType, createModelAction } from './ModelAction';

class CartActionCreator {

    private dispatch: Dispatch<ModelAction>;

    public constructor(dispatch: Dispatch<ModelAction>) {

        this.dispatch = dispatch;
    }

    public addCartEntry(entry: CartEntry): void {

        this.dispatch(createModelAction(CartActionType.ADD_CART_ITEM_ACTION, entry));
    }

    public clearCart(): void {

        this.dispatch(createModelAction(CartActionType.CLEAR_CART_ITEMS_ACTION));
    }

    public removeCartEntry(entry: CartEntry): void {

        this.dispatch(createModelAction(CartActionType.REMOVE_CART_ITEM_ACTION, entry));
    }
}

export default CartActionCreator;