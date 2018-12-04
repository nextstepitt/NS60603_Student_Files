// Menu.js
// Copyright © NextStep IT Training. All rights reserved.
//
// Cafe menu view.
//

import React, { Component, ReactNode } from 'react';

import '../Assets/styles/application.css';
import Product from '../Data-Access/Product';
import ProductList from './ProductList';
import dataContext from '../Data-Access/dataContext';

interface MenuProps {

}

class MenuState {

    public beverages: Product[] = Array<Product>();
    public beveragesError: boolean = false;
    public pastries: Product[] = Array<Product>();
    public pastriesError: boolean = false;
}

class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public constructor(props: MenuProps) {

        super(props)
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

    public render(): ReactNode {

        return (
            <div className="app-content">
                <h1>Menu</h1>
                <ProductList title="Beverages" products={ this.state.beverages } error={ this.state.beveragesError } />
                <ProductList title="Pastries" products={ this.state.pastries } error={ this.state.pastriesError } />
            </div>
        );
    }
}

export default Menu;