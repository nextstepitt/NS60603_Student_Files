// index.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// This is a single file example of using MobX with React; both the observer pattern and injection.
// All of the components are here in one place, but they could easily be separated into their own
// individual modules: ExampleStore, ObserverComponent, App (with the Provider), and index.
//

import './index.css';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Provider } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';

// This is the class that defines a store. MobX allows and encourages multiple stores, which is not
// always a bad thing: separation of concerns, single responsibility, etc. @observable is a decorator
// that marks the properties of the store that are tracked by MobX. MobX does not actually track the
// values; it watches for property values to be changed. In the case of the array, it inserts a
// proxy object between the property and the array to monitor changes to the array.
// 

class ExampleStore {

    @observable public name: string = 'initial value';
    @observable public values: Array<string> = new Array<string>();
    @observable public ivalue: number = 5;

    public constructor() {

        this.name = '(wait for it)';
    }
}

// This is a React component that will observe the store. The @inject decorator accepts one or more stores
// to inject, by name. The stores must be registered with the same names (see the Validator below). The
// @observer decorator binds this component to the data used in the class methods; if the data changes
// then MobX will cause the component to be re-rendered.
//
// Because the store is not passed as a prop when the component is actually rendered (it is injected by MobX),
// the prop has to be an optional prop. But that leads to a problem in the component, because referencing
// properties of the store will cause TS errors as it sees that the prop could be null. Instead of doing a
// lot of conditional statements checking to see that the prop is not null before using it, judicious use
// of the TS ! operator to mute the error will work because we "know" that the prop will never be null.

interface ObserverComponentProps {

    exampleStore?: ExampleStore;
}

@inject('exampleStore')
@observer
class ObserverComponent extends Component<ObserverComponentProps> {

    constructor(props: ObserverComponentProps) {

        super(props);
    }

    public render(): ReactNode {
        
        return (
            <div>
                Hello '{ this.props.exampleStore!.name }' <button onClick={() => this.props.exampleStore!.name="somebody"}>Set name</button><br />
                { this.props.exampleStore!.values.length }: { this.props.exampleStore!.values.join() } <button onClick={ () => this.props.exampleStore!.values.push("9") }>Add "9"</button><br/>
                { this.props.exampleStore!.ivalue } <button onClick={ () => this.props.exampleStore!.ivalue = 9 }>Change to "9"</button><br />
            </div>
        );
    }
}

// Create the store(s). This is the pattern for multiple stores: each store created will be passed as a named
// prop to Validator. This is accomplished by assigning each store to a property in an object, and then expanding
// the object as the properties of Validator.

const stores = { exampleStore: new ExampleStore() };

ReactDOM.render(
    <Provider { ...stores }>
        <ObserverComponent />
    </Provider>,
    document.getElementById('root'));