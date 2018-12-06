// ProductItem.tsx
// Copyright © NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';

import '../Assets/styles/application.css';
import Product from '../Data-Access/Product';

interface ProductItemProps {

    addToCart(product: Product): void;
    product: Product;
}

class ProductItem extends Component<ProductItemProps> {

    public render(): ReactNode {

        return (
            <tr>
                <td className="list-name">{this.props.product.name}</td>
                <td className="list-price">${this.props.product.price}</td>
                <td className="list-add-button"><button onClick={ () => this.props.addToCart(this.props.product) }>Add to cart</button></td>
            </tr>
        );
    }
}

export default ProductItem;