// ProductItem.js
// Copyright © NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';

import '../Assets/styles/application.css';
import Product from '../Data-Access/Product';


interface ProductItemProps {

    product: Product;
}

class ProductItem extends Component<ProductItemProps> {

    public render(): ReactNode {

        return (
            <tr>
                <td className="list-name">{this.props.product.name}</td>
                <td className="list-price">${this.props.product.price}</td>
            </tr>
        );
    }
}

export default ProductItem;