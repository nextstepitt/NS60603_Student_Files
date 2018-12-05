// modelActions.js
// Copyright © NextStep IT Training. All rights reserved.
//

export const SET_BEVERAGES_ACTION = 'set_beverages_action'
export const SET_BEVERAGES_ERROR_ACTION = 'set_beverages_error_action'
export const SET_PASTRIES_ACTION = 'set_pastries_action'
export const SET_PASTRIES_ERROR_ACTION = 'set_pastries_error_action'

export const ADD_CART_ITEM_ACTION = 'add_order_item_action'
export const CLEAR_CART_ITEMS_ACTION = 'clear_order_items_action'
export const REMOVE_CART_ITEM_ACTION = 'remove_order_item_action'

class ModelAction {

    public type: string;
    public data: any;

    public constructor(type: string, data?: any) {

        this.type = type;
        this.data = data;
    }
}

export default ModelAction;