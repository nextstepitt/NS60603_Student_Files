// Products.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import Product from '../Data-Access/Product';

class Products {

    public beverages: Array<Product> = new Array<Product>();
    public beveragesError: boolean = false;
    public pastries: Array<Product> = new Array<Product>();
    public pastriesError: boolean = false;

    public constructor(source?: Products) {

        if (source) {

            // Shallow clone of the properties in this class, for purposes of immutable state.

            this.beverages = [ ...source.beverages ];
            this.beveragesError = source.beveragesError;
            this.pastries = [ ...source.pastries ];
            this.pastriesError = source.pastriesError;
        }
    }

}

export default Products;