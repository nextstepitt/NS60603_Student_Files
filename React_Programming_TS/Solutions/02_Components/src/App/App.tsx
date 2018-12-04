import React, { Component, ReactNode } from 'react';

import '../Assets/styles/application.css';
import Header from '../Boilerplate/Header';
import Footer from '../Boilerplate/Footer';
import Landing from '../Landing/Landing';

class App extends Component {

    public render(): ReactNode {

        return (
            <div className="app">
                <Header />
                <div className="app-content">
                    <Landing />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;