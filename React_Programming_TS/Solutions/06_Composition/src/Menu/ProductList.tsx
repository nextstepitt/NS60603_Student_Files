// ProductList.tsx
// Copyright © NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';

import '../Assets/styles/application.css';
import AccordionList from '../Common/AccordionList'
import Product from '../Data-Access/Product';
import ProductItem from './ProductItem';

interface ProductListProps {

    error: boolean;
    title: string;
    products: Product[];
}

class ProductList extends Component<ProductListProps> {


    public render(): ReactNode {

        let content = null

        if (this.props.error) {

            content = <span className="error">The list cannot be loaded.</span>
        
        } else {

            let productItems = this.props.products.map( (product) => <ProductItem key={ product.id } product={ product } /> )

            content = (
                <table className="list">
                    <thead>
                        <tr>
                            <th className="list-name"></th>
                            <th className="list-price">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productItems }
                    </tbody>
                </table>
            );
        }

        return (
            <AccordionList title={ this.props.title } open={ false }>
                { content }
            </AccordionList>
        );
    }
}

export default ProductList;