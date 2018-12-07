// App.tsx
// Copyright © NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import '../Assets/styles/application.css';
import Main from './Main';
import ModelStoreController from '../Model/ModelStoreController';

interface AppProps {

}

class App extends Component<AppProps> {

    private modelStoreController: ModelStoreController;

    public constructor(props: AppProps) {

        super(props);

        this.modelStoreController = new ModelStoreController();
    }

    public render(): ReactNode {

        return (
            <Provider store={ this.modelStoreController.store }>
                <Router>
                    <Main />
                </Router>
            </Provider>
        );
    }
}

export default App;