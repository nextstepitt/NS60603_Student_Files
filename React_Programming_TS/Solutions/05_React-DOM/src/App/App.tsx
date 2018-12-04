import React, { Component, ReactNode } from 'react';

import '../Assets/styles/application.css'
import Header from '../Boilerplate/Header'
import Footer from '../Boilerplate/Footer'
import Menu from '../Menu/Menu'

interface AppProps {

}

class AppState {

    public showMenu: boolean = true;
}

class App extends Component<AppProps, AppState> {

    readonly state = new AppState();

    constructor(props: AppProps) {

        super(props)

        setTimeout( () => {

            this.setState( { showMenu: false } )
        
        }, 5000)
    }

    public render(): ReactNode {

        const content = this.state.showMenu ? <Menu /> : null

        return (
            <div className="app">
                <Header />
                <div className="app-content">
                    { content }
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;