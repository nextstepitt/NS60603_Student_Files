// CartReducer.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { AnyAction } from 'redux';
import ModelAction, { CartActionType } from './ModelAction';
import Cart from '../Cart/Cart';
import CartEntry from '../Cart/CartEntry';

class CartReducer {

    public constructor() {

        this.reduce = this.reduce.bind(this)
    }

    public reduce(state: Cart | undefined, action: AnyAction): Cart {

        let resultState: Cart = state ? state : new Cart();

        switch (action.type) {

            case CartActionType.ADD_CART_ITEM_ACTION:
                resultState = this.reduceNewEntry(state, action.payload);
                break;

            case CartActionType.CLEAR_CART_ITEMS_ACTION:
                resultState = this.reduceClearEntries(state);
                break;
            
            case CartActionType.REMOVE_CART_ITEM_ACTION:
                resultState = this.reduceRemoveEntry(state, action.payload);
                break;

            default:
                break;
        }

        return resultState;
    }

    private reduceNewEntry(state: Cart | undefined, entry: CartEntry): Cart {

        let result = new Cart(state);

        result.add(entry);
        
        return result;
    }

    private reduceClearEntries(state: Cart | undefined): Cart {

        let result = new Cart(state);

        result.clear();

        return result;
    }

    private reduceRemoveEntry(state: Cart | undefined, entry: CartEntry): Cart {

        let result = new Cart(state);

        result.delete(entry);

        return result;
    }
}

export default CartReducer;