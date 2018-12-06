// App.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import '../Assets/styles/application.css';
import Cart from '../Cart/Cart';
import DataContext from '../Data-Access/DataContext';
import Main from './Main';
import Products from '../Model/Products';

import { autorun } from 'mobx';

let stores = { cart: new Cart(), dataContext: new DataContext(), products: new Products() };

class App extends Component {

    public render(): ReactNode {

        return (
            <Router>
                <Provider { ...stores }>
                    <Main />
                </Provider>
            </Router>
        );
    }
}

export default App;