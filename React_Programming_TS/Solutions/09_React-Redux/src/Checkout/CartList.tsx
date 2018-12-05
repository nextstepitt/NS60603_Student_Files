// CartList.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Show the shopping cart contents.

import React, { Component, ReactNode } from 'react';
import CartActionCreator from '../Model/CartActionCreator';
import Cart from '../Cart/Cart';
import CartEntry from '../Cart/CartEntry';

interface CartListProps {

    cart?: Cart;
    cartData?: CartActionCreator;
}

class CartList extends Component<CartListProps> {

    constructor(props: CartListProps) {

        super(props);

        this.remove = this.remove.bind(this);
    }

    public render(): ReactNode {

        let result = null;

        if (this.props.cart && this.props.cart.entries.length > 0) {

            let items = this.props.cart.entries.map( (entry) => ( <tr key="entry.id">
                                                                        <td className="cart-name">{ entry.name }</td>
                                                                        <td className="cart-price">{ entry.price }</td>
                                                                        <td className="cart-remove-button"><button onClick={ () => this.remove(entry) }>Remove</button></td>
                                                                        <td className="cart-instructions">{ entry.instructions }</td>
                                                                    </tr> ));

            let total = ( <tr key="total">
                                <td className="cart-name"></td>
                                <td className="cart-price">{ cart.total() }</td>
                                <td className="cart-remove-button"></td>
                                <td className="cart-instructions"></td>
                            </tr> );

            result = ( <table className="cart">
                            <tbody>
                                { items }
                                { total }
                            </tbody>
                        </table> );
        }

        return result;
    }

    public remove(entry: CartEntry): void {

        this.props.cartData && this.props.cartData.removeCartEntry(entry);
        
        // State must change to update the view, so a dummy entry.

        this.setState({ dummy: null });
    }
}

export default CartList;