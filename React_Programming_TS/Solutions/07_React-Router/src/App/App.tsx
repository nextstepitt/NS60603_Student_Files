import React, { Component, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../Assets/styles/application.css';
import Main from './Main';

class App extends Component {

    public render(): ReactNode {

        return (
            <Router>
                <Main />
            </Router>
        );
    }
}

export default App;