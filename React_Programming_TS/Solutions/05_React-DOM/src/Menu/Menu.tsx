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
    private mounted: boolean = true;

    public constructor(props: MenuProps) {

        super(props)

        console.log("Menu: constructor");

        this.loadBeverages();
        this.loadPastries();
    }

    public componentDidMount(): void {

        console.log("Menu: componentDidMount");
    }

    public componentDidUpdate(prevProps: MenuProps, prevState: MenuState, snapshot: any): void {

        console.log("Menu: componentDidUpdate");
    }

    public componentWillUnmount(): void {

        console.log("Menu: componentWillUnmount");

        this.mounted = false;
    }

    public static getDerivedStateFromProps(props: MenuProps, state: MenuState): MenuState | null {

        console.log("Menu: getDerivedStateFromProps");

        return null;
    }

    public getSnapshotBeforeUpdate(prevProps: MenuProps, prevState: MenuState): any {

        console.log("Menu: getSnapshotFromProps");

        return null;
    }

    public async loadBeverages(): Promise<void> {

        try {
        
            const beverages = await dataContext.beverageContext.getBeveragesSlow();

            if (this.mounted) {

                this.setState({ beverages: beverages, beveragesError: false });
            }
        }

        catch (error) {
            
            console.log(error);
            this.setState({ pastries: [], beveragesError: true });
        }
    }

    public async loadPastries(): Promise<void> {

        try {
        
            const pastries = await dataContext.pastryContext.getPastriesSlow();

            if (this.mounted) {

                this.setState({ pastries: pastries, pastriesError: false });
            }
        }

        catch (error) {
            
            console.log(error);
            this.setState({ pastries: [], pastriesError: true });
        }
    }

    public render(): ReactNode {

        console.log("Menu: render")

        return (
            <div className="app-content">
                <h1>Menu</h1>
                <ProductList title="Beverages" products={ this.state.beverages } error={ this.state.beveragesError } />
                <ProductList title="Pastries" products={ this.state.pastries } error={ this.state.pastriesError } />
            </div>
        );
    }

    public shouldComponentUpdate(nextProps: MenuProps, nextState: MenuState): boolean {

        console.log("Menu: shouldComponentMount");

        return true;
    }
}

export default Menu;