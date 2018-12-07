// ModelAction.js
// Copyright © NextStep IT Training. All rights reserved.
//

import { Action, AnyAction } from 'redux';

enum ProductActionType {
    SET_BEVERAGES_ACTION = 'set_beverages_action',
    SET_BEVERAGES_ERROR_ACTION = 'set_beverages_error_action',
    SET_PASTRIES_ACTION = 'set_pastries_action',
    SET_PASTRIES_ERROR_ACTION = 'set_pastries_error_action',
}

enum CartActionType {
    ADD_CART_ITEM_ACTION = 'add_cart_item_action',
    CLEAR_CART_ITEMS_ACTION = 'clear_cart_items_action',
    REMOVE_CART_ITEM_ACTION = 'remove_cart_item_action'

}

function createModelAction(type: string, payload?: any) {

    return { type: type, payload: payload };
}

export default interface ModelAction extends AnyAction {

    type: string;
    payload?: any;
}

export { CartActionType, ProductActionType, createModelAction }