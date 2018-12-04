// Landing.js
// Copyright © nTier Training. All rights reserved.
//
// Application landing page content.
//

import React, { Component } from 'react'

import '../Assets/styles/application.css'

class Landing extends Component {

    render() {

        const today: Date = new Date();
        let message: JSX.Element | null = null;

        if (today.getHours() < 12) {

            message =   <span className="welcome-message">
                            Good morning!&nbsp;
                            Welcome to the Caribbean Coffee Company!
                        </span>
        
        } else if (today.getHours() < 17) {
    
            message =   <span className="welcome-message">
                            Good afternoon!&nbsp;
                            Welcome to the Caribbean Coffee Company!
                        </span>
    
        } else {
    
            message =   <span className="welcome-message">
                            Good Evening!&nbsp;
                            Welcome to the Caribbean Coffee Company. Sorry, we are closed.
                        </span>
        }

        return message
    }
}

export default Landing