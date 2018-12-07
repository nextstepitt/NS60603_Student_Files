// Menu.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// Cafe menu view.
//

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import React, { Component, FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import '../Assets/styles/application.css';
import CartActionCreator from '../Model/CartActionCreator';
import CartEntry from '../Cart/CartEntry';
import CartList from '../Checkout/CartList';
import ModelState from '../Model/ModelState';
import Product from '../Data-Access/Product';
import ProductActionCreator from '../Model/ProductActionCreator';
import ProductList from './ProductList';
import dataContext from '../Data-Access/dataContext';
import Cart from '../Cart/Cart';

interface MenuProps {

    beverages: Product[];
    beveragesError: boolean;
    cart?: Cart;
    cartAction?: CartActionCreator;
    pastries: Product[];
    pastriesError: boolean;
    productAction?: ProductActionCreator;
}

class MenuState {

    public item: Product | null = null;
    public showSpecialInstructions: boolean = false;
    public specialInstructions: string = '';
}

// @connect(mapStateToProps, mapDispatchToProps)
class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public constructor(props: MenuProps) {

        super(props)

        this.addToCart = this.addToCart.bind(this);
        this.cancelAddToCart = this.cancelAddToCart.bind(this);
        this.changeSpecialInstructions = this.changeSpecialInstructions.bind(this);
        this.commitAddToCart = this.commitAddToCart.bind(this);
    }

    public addToCart(item: Product): void {

        this.setState({ showSpecialInstructions: true, item: item })
    }

    public cancelAddToCart(): void {

        this.setState({ showSpecialInstructions: false, specialInstructions: '' })
    }

    public changeSpecialInstructions(event: FormEvent<HTMLInputElement>): void {

        this.setState({ specialInstructions: event.currentTarget.value })
    }

    public commitAddToCart(): void {

        if (this.props.cartAction && this.state.item) {

            this.props.cartAction.addCartEntry(new CartEntry({ name: this.state.item.name, price: this.state.item.price, instructions: this.state.specialInstructions }))
            this.setState({ showSpecialInstructions: false, specialInstructions: '' })
        }
    }

    public componentDidMount(): void {

        this.props.productAction!.getBeverages();
        this.props.productAction!.getPastries();
    }

    public static mapStateToProps(state: ModelState, ownProps: any): any {

        return {

            beverages: state.products.beverages,
            beveragesError: state.products.beveragesError,
            pastries: state.products.pastries,
            pastriesError: state.products.pastriesError,
            cart: state.cart
        }
    }

    public static mapDispatchToProps(dispatch: Dispatch, ownProps: any): any {

        return {

            cartAction: new CartActionCreator(dispatch),
            productAction: new ProductActionCreator(dispatch)
        }
    }

    public render(): ReactNode {

        return (
            <div className="app-content">
                <div className={ this.state.showSpecialInstructions ? 'special-instructions-visible' : 'special-instructions-hidden' }></div>
                <div className={ this.state.showSpecialInstructions ? 'special-instructions' : 'special-instructions-hidden' }>
                    { this.state.item ? this.state.item.name : null }<br/><br/>
                    <input className="special-instructions" type="text" placeholder="Special Instructions" value={ this.state.specialInstructions } onChange={ this.changeSpecialInstructions } /><br/>
                    <div className="special-instructions-buttons">
                        <button onClick={ this.cancelAddToCart }>Cancel</button>
                        <button onClick={ this.commitAddToCart }>Add to Cart</button>
                    </div>
                </div>
                <h1>Menu</h1>
                <ProductList title="Beverages" products={ this.props.beverages } error={ this.props.beveragesError } addToCart={ this.addToCart } />
                <ProductList title="Pastries" products={ this.props.pastries } error={ this.props.pastriesError } addToCart={ this.addToCart } />
                <h2>Cart</h2>
                <CartList />
                { this.props.cart && this.props.cart.entries.length ? <Link to="/checkout"><button>Checkout</button></Link> : null }
            </div>
        );
    }
}

export default connect(Menu.mapStateToProps, Menu.mapDispatchToProps)(Menu);