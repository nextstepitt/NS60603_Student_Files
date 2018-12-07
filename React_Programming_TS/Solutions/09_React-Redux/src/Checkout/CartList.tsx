// CartList.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Show the shopping cart contents.

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import React, { Component, ReactNode } from 'react';

import CartActionCreator from '../Model/CartActionCreator';
import Cart from '../Cart/Cart';
import CartEntry from '../Cart/CartEntry';
import ModelState from '../Model/ModelState';

interface CartListProps {

    cart?: Cart;
    cartAction?: CartActionCreator;
}

class CartList extends Component<CartListProps> {

    constructor(props: CartListProps) {

        super(props);

        this.remove = this.remove.bind(this);
    }

    public static mapStateToProps(state: ModelState, ownProps: any): any {

        return {

            cart: state.cart
        }
    }

    public static mapDispatchToProps(dispatch: Dispatch, ownProps: any): any {

        return {

            cartAction: new CartActionCreator(dispatch)
        }
    }

    public render(): ReactNode {

        let result = null;

        if (this.props.cart && this.props.cart.entries.length > 0) {

            let items = this.props.cart.entries.map( (entry) => ( <tr key={ entry.id }>
                                                                        <td className="cart-name">{ entry.name }</td>
                                                                        <td className="cart-price">{ entry.price }</td>
                                                                        <td className="cart-remove-button"><button onClick={ () => this.remove(entry) }>Remove</button></td>
                                                                        <td className="cart-instructions">{ entry.instructions }</td>
                                                                    </tr> ));

            let total = ( <tr key="total">
                                <td className="cart-name"></td>
                                <td className="cart-price">{ this.props.cart.total() }</td>
                                <td className="cart-remove-button"></td>
                                <td className="cart-instructions"></td>
                            </tr> );

            result = ( <table className="cart">
                            <thead>
                                <tr>
                                    <th className="cart-name">Product</th>
                                    <th className="cart-price">Price</th>
                                    <th className="cart-remove-button">&nbsp;</th>
                                    <th className="cart-instructions">Special Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { items }
                                { total }
                            </tbody>
                        </table> );
        }

        return result;
    }

    public remove(entry: CartEntry): void {

        this.props.cartAction && this.props.cartAction.removeCartEntry(entry);
        
        // State must change to update the view, so a dummy entry.

        this.setState({ dummy: null });
    }
}

export default connect(CartList.mapStateToProps, CartList.mapDispatchToProps)(CartList);