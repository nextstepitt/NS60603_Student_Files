// Header.js
// Copyright © nTier Training. All rights reserved.
//
// Application header content.
//

import React, { Component } from 'react'

import '../Assets/styles/application.css'
import logo from '../Assets/images/tccc-logo.png'

class Header extends Component {

    render() {

        return (
            <header className="app-header">
                <img id="app-logo" src={logo} alt="logo" />
            </header>
        );
    }
}

export default Header