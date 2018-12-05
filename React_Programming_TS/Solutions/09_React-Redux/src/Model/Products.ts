// Products.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import Product from '../Data-Access/Product';

class Products {

    beverages: Array<Product> = new Array<Product>();
    beveragesError: boolean = false;
    pastries: Array<Product> = new Array<Product>();
    pastriesError: boolean = false;
}

export default Products;