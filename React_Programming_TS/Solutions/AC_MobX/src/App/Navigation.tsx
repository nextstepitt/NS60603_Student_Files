// Navigation.jsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import React, { Component, ComponentClass, ReactNode } from 'react';
import { withRouter } from 'react-router';
import { History } from 'history';

interface NavigationProps {

}

class Navigation extends Component<NavigationProps> {

	private history: History | null = null;
	private NavWithRouter: ComponentClass;

	constructor(props: NavigationProps) {
		
		super(props)

		this.pushCheckout = this.pushCheckout.bind(this)
		this.pushHome = this.pushHome.bind(this)
		this.pushMenu = this.pushMenu.bind(this)
		
		this.NavWithRouter = withRouter((props) => {

			this.history = props.history

			return (
				<div className="navigation">
					<button className={ `${ props.location.pathname === '/' ? 'navbutton-selected' : 'navbutton' }` }
						onClick={ this.pushHome }>Home</button>
					<button className={ `${ props.location.pathname === '/menu' ? 'navbutton-selected' : 'navbutton' }` }
						onClick={ this.pushMenu }>Menu</button>
					<button className={ `${ props.location.pathname === '/checkout' ? 'navbutton-selected' : 'navbutton' }` }
						onClick={ this.pushCheckout }>Checkout</button>
				</div>
			)
		})
	}

    public render(): ReactNode {

		const NavWithRouter = this.NavWithRouter

		return <NavWithRouter />
	}
	
	public pushHome(): void {

		this.history && this.history.push('/')
	}

	public pushMenu(): void {

		this.history && this.history.push('/menu')
	}

	public pushCheckout(): void {

		this.history && this.history.push('/checkout')
	}
}

export default Navigation;