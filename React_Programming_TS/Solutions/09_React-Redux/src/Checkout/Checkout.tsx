// Checkout.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import React, { Component, FormEvent, ReactNode } from 'react';
import Validator from 'react-data-validator';
import { Link, withRouter } from 'react-router-dom';

import '../Assets/styles/application.css';
import CartActionCreator from '../Model/CartActionCreator';
import CartList from './CartList';
import Cart from '../Cart/Cart';

interface CheckoutProps {

    cart?: Cart;
    cartAction?: CartActionCreator;
}

class CheckoutState {

    public cardNumber: string = '';
    public cardNumberIsValid: boolean = true;
    public error: boolean = false;
    public name: string = '';
    public nameIsValid: boolean = true;
}

class Checkout extends Component<CheckoutProps, CheckoutState> {

    public readonly state = new CheckoutState();
    private cardNumberIsValid: boolean = true;
    private nameIsValid: boolean = true;

    constructor(props: CheckoutProps) {

        super(props)

        this.onCardNumberInvalid = this.onCardNumberInvalid.bind(this)
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onNameInvalid = this.onNameInvalid.bind(this)
        this.checkout = this.checkout.bind(this)
    }

    public checkout(props: any): void {

        if (this.isValid()) {

            this.props.cartAction && this.props.cartAction.clearCart();
            props.history.push("/Menu")
        }

        this.setState({ error: true });
    }

    public componentDidMount(): void {

        this.setValidState();
    }

    public componentDidUpdate(props: CheckoutProps, state: CheckoutState): void {

        this.setValidState();
    }

    public isValid(): boolean {

        return this.state.cardNumberIsValid && this.state.nameIsValid;
    }

    public static mapStateToProps(state: any): any {

        return {

            cart: state.cart
        }
    }

    static mapDispatchToProps(dispatch: Dispatch): any {

        return {

            cartAction: new CartActionCreator(dispatch)
        }
    }

    public onCardNumberInvalid(): void {

        this.cardNumberIsValid = false;
     }

    public onChangeCardNumber(event: FormEvent<HTMLInputElement>): void {

        this.setState({ cardNumber: event.currentTarget.value });
    }

    public onChangeName(event: FormEvent<HTMLInputElement>): void {

        this.setState({ name: event.currentTarget.value });
    }

    public onNameInvalid(): void {

        this.nameIsValid = false
    }

    public render(): ReactNode {

        this.cardNumberIsValid = true;
        this.nameIsValid = true;

        let SubmitButton = this.props.cart && this.props.cart.entries.length && this.isValid() ? withRouter( (props) => <input type="button" value="Submit" onClick={ () => this.checkout(props) } /> ) : () => null;

        return (
            <div>
                <h1>Checkout</h1>
                <CartList />
                <form>
                    <Validator className="cc-form-errors" value={ this.state.name } isRequired={ true } renderOnEmpty={ true } constraint={ /^[A-Za-z][a-z]+( [A-Za-z]\.?)? [A-Za-z][a-z]+/ } notify={ this.onNameInvalid }>Provide a first and last name with initial capital letters, an uppercase middle intitial is permitted.</Validator><br />
                    <Validator className="cc-form-errors" value={ this.state.cardNumber } isRequired={ true } renderOnEmpty={ true } constraint={ /^\d{12,19}$/ } notify={ this.onCardNumberInvalid }>Please enter a valid card number.</Validator><br />
                    <div className="cc-form">
                        <div className="cc-form-row">
                            <div className="cc-form-label"><label className="cc-form-label">Name:</label></div>
                            <div className="cc-form-field"><input type="text" className={ 'cc-form-field ' + ( this.state.nameIsValid ? 'cc-form-field-requirement-met' : 'cc-form-field-required' ) } value={ this.state.name } onChange={ this.onChangeName } /></div>
                            <div className="clear-all"></div>
                        </div>
                        <div className="cc-form-row">
                            <div className="cc-form-label"><label className="cc-form-label">Card Number:</label></div>
                            <div className="cc-form-field"><input type="text" className={ 'cc-form-field ' + ( this.state.cardNumberIsValid ? 'cc-form-field-requirement-met' : 'cc-form-field-required' ) } value={ this.state.cardNumber } onChange={ this.onChangeCardNumber } /></div>
                            <div className="clear-all"></div>
                        </div>
                        <div className="cc-form-row">
                            <div className="cc-form-label"></div>
                            <div className="cc-form-field">
                                <Link to="/Menu"><button>Cancel</button></Link>&nbsp;
                                <SubmitButton />
                            </div>
                            <div className="clear-all"></div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    public setValidState(): void {

        if (this.state.cardNumberIsValid !== this.cardNumberIsValid ||
            this.state.nameIsValid !== this.nameIsValid) {

            this.setState({
                cardNumberIsValid: this.cardNumberIsValid,
                nameIsValid: this.nameIsValid
            });
        }
    }
}

export default connect(Checkout.mapStateToProps, Checkout.mapDispatchToProps)(Checkout);