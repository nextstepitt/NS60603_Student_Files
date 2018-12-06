// Main.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react' ;

import Footer from '../Boilerplate/Footer';
import Header from '../Boilerplate/Header';
import Navigation from './Navigation';
import Routes from './Routes';

interface MainProps {

}

class Main extends Component<MainProps> {

    public render(): ReactNode {

        return (
            <div className="app">
                <Header />
                <Navigation />
                <div className="app-content">
                    <Routes />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;