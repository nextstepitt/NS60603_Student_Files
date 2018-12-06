// Menu.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// Cafe menu view.
//

import React, { Component, FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import '../Assets/styles/application.css';
import Cart from '../Cart/Cart';
import CartEntry from '../Cart/CartEntry';
import CartList from '../Checkout/CartList';
import DataContext from '../Data-Access/DataContext';
import Product from '../Data-Access/Product';
import ProductList from './ProductList';
import Products from '../Model/Products';

interface MenuProps {

    cart?: Cart;
    dataContext?: DataContext;
    products?: Products;
}

class MenuState {

    public beveragesError: boolean = true;
    public item: Product | null = null;
    public pastriesError: boolean = true;
    public showSpecialInstructions: boolean = false;
    public specialInstructions: string = '';
}

@inject('cart', 'dataContext', 'products')
@observer
class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public constructor(props: MenuProps) {

        super(props)
    }

    public async loadBeverages(): Promise<void> {

        try {
        
            const beverages = await this.props.dataContext!.beverageContext.getBeverages();

            this.props.products!.beverages = beverages;
            this.setState({ beveragesError: false });
        }

        catch (error) {
            
            console.log(error);
            this.props.products!.beverages = new Array<Product>();
            this.setState({ beveragesError: true });
        }
    }

    @action
    public async loadPastries(): Promise<void> {
            
        try {
        
            const pastries = await this.props.dataContext!.pastryContext.getPastries();

            this.props.products!.pastries = pastries;
            this.setState({ pastriesError: false });
        }

        catch (error) {
            
            console.log(error);
            this.props.products!.pastries = Array<Product>();
            this.setState({ pastriesError: false });
        }
    }

    @action.bound
    public addToCart(item: Product): void {

        this.setState({ showSpecialInstructions: true, item: item })
    }

    @action.bound
    public cancelAddToCart(): void {

        this.setState({ showSpecialInstructions: false, specialInstructions: '' })
    }

    @action.bound
    public changeSpecialInstructions(event: FormEvent<HTMLInputElement>): void {

        this.setState({ specialInstructions: event.currentTarget.value })
    }

    @action.bound
    public commitAddToCart(): void {

        if (this.state.item) {

            this.props.cart!.add(new CartEntry({ name: this.state.item.name, price: this.state.item.price, instructions: this.state.specialInstructions }))
            this.setState({ showSpecialInstructions: false, specialInstructions: '' })
        }
    }

    public componentDidMount(): void {

        this.loadBeverages();
        this.loadPastries();
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
                <ProductList title="Beverages" products={ this.props.products!.beverages } error={ this.state.beveragesError } addToCart={ this.addToCart } />
                <ProductList title="Pastries" products={ this.props.products!.pastries } error={ this.state.pastriesError } addToCart={ this.addToCart } />
                <h2>Cart</h2>
                <CartList />
                { this.props.cart!.entries.length ? <Link to="/checkout"><button>Checkout</button></Link> : null }
            </div>
        );
    }
}

export default Menu;