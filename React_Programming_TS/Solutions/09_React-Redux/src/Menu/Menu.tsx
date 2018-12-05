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
import Product from '../Data-Access/Product';
import ProductActionCreator from '../Model/ProductActionCreator';
import ProductList from './ProductList';
import dataContext from '../Data-Access/dataContext';

interface MenuProps {

    cartData?: CartActionCreator;
    productsData?: ProductActionCreator;
}

class MenuState {

    public beverages: Product[] = Array<Product>();
    public beveragesError: boolean = false;
    public item: Product | null = null;
    public pastries: Product[] = Array<Product>();
    public pastriesError: boolean = false;
    public showSpecialInstructions: boolean = false;
    public specialInstructions: string = '';
}

class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public constructor(props: MenuProps) {

        super(props)

        this.addToCart = this.addToCart.bind(this);
        this.cancelAddToCart = this.cancelAddToCart.bind(this);
        this.changeSpecialInstructions = this.changeSpecialInstructions.bind(this);
        this.commitAddToCart = this.commitAddToCart.bind(this);

        this.loadBeverages();
        this.loadPastries();
    }

    public async loadBeverages(): Promise<void> {

        try {
        
            const beverages = await dataContext.beverageContext.getBeverages();

            this.setState({ beverages: beverages, beveragesError: false });
        }

        catch (error) {
            
            console.log(error);
            this.setState({ pastries: [], beveragesError: true });
        }
    }

    public async loadPastries(): Promise<void> {

        try {
        
            const pastries = await dataContext.pastryContext.getPastries();

            this.setState({ pastries: pastries, pastriesError: false });
        }

        catch (error) {
            
            console.log(error);
            this.setState({ pastries: [], pastriesError: true });
        }
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

        if (this.state.item) {

            this.props.cartData && this.props.cartData.addCartEntry(new CartEntry({ name: this.state.item.name, price: this.state.item.price, instructions: this.state.specialInstructions }))
            this.setState({ showSpecialInstructions: false, specialInstructions: '' })
        }
    }

    public static mapStateToProps(state: any, ownProps: any): any {

        return {

            beverages: state.product.beverages,
            beveragesError: state.product.beveragesError,
            pastries: state.product.pastries,
            pastriesError: state.product.pastriesError,
            cart: state.cart
        }
    }

    public static mapDispatchToProps(dispatch: Dispatch, ownProps: any): any {

        return {

            cartData: new CartActionCreator(dispatch),
            productData: new ProductActionCreator(dispatch)
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
                <ProductList title="Beverages" products={ this.state.beverages } error={ this.state.beveragesError } addToCart={ this.addToCart } />
                <ProductList title="Pastries" products={ this.state.pastries } error={ this.state.pastriesError } addToCart={ this.addToCart } />
                <h2>Cart</h2>
                <CartList />
                { cart.entries.length ? <Link to="/checkout"><button>Checkout</button></Link> : null }
            </div>
        );
    }
}

export default connect(Menu.mapStateToProps, Menu.mapDispatchToProps)(Menu);