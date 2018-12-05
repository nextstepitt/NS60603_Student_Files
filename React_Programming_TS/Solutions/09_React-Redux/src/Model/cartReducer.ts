// ordertReducer.js
// Copyright © NextStep IT Training. All rights reserved.
//

import ModelAction, { ADD_CART_ITEM_ACTION, CLEAR_CART_ITEMS_ACTION, REMOVE_CART_ITEM_ACTION } from './ModelAction';
import Cart from '../Cart/Cart';
import CartEntry from '../Cart/CartEntry';

class CartReducer {

    constructor() {

        this.reduce = this.reduce.bind(this)
    }

    reduce(state: Cart, action: ModelAction): Cart {

        let result: Cart | null = state ? state : new Cart(null);

        switch (action.type) {

            case ADD_CART_ITEM_ACTION:
                result = this.reduceNewEntry(result, action.data);
                break;

            case CLEAR_CART_ITEMS_ACTION:
                result = this.reduceClearEntries(result);
                break;
            
            case REMOVE_CART_ITEM_ACTION:
                result = this.reduceRemoveEntry(result, action.data);
                break;

            default:
                break;
        }

        return result;
    }

    private reduceNewEntry(state: Cart, entry: CartEntry): Cart {

        let result = new Cart(state);

        result.add(entry);
        
        return result;
    }

    private reduceClearEntries(state: Cart): Cart {

        let result = new Cart(state);

        result.clear();

        return result;
    }

    private reduceRemoveEntry(state: Cart, entry: CartEntry): Cart {

        let result = new Cart(state);

        result.delete(entry);

        return result;
    }
}

export default (new CartReducer()).reduce;