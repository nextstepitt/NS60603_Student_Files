// Routes.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';
import { Route, Switch } from 'react-router';

import Checkout from '../Checkout/Checkout';
import Landing from '../Landing/Landing';
import Menu from '../Menu/Menu';

interface RoutesProps {

}

class Routes extends Component<RoutesProps> {

    public render(): ReactNode {

        return (
            <Switch>
                <Route path="/" exact={ true } component={ Landing } />
                <Route path="/menu" component={ Menu } /> } />
                <Route path="/checkout" component={ Checkout } /> } />
            </Switch>
        );
    }
}

export default Routes;