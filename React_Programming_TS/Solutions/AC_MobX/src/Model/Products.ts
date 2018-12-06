// Products.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Return a singleton shopping cart for the application facets to share.
//

import { observable } from 'mobx';

import Product from '../Data-Access/Product';

interface Products {
}

class Products {

    @observable public beverages: Product[] = new Array<Product>();
    @observable public pastries: Product[] = new Array<Product>();
}

export default Products;