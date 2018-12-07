// Cart.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Return a singleton shopping cart for the application facets to share.
//

import CartEntry from './CartEntry';

class Cart {

    public entries: CartEntry[] = new Array<CartEntry>();
    private entryIdentity = 0;

    public constructor(source?: Cart) {

        // Shallow clonse of the properies of this class, for purposes of immutable state.

        if (source) {

            this.entries = [ ...source.entries ];
        }
    }

    public add(entry: CartEntry): void {

        entry.id = ++this.entryIdentity;
        this.entries.push(entry);
    }

    public delete(entry: CartEntry): void {

        let index = this.entries.indexOf(entry);

        if (index >= 0) {

            this.entries.splice(index, 1);
        }
    }

    public clear(): void {

        this.entries = new Array<CartEntry>();
    }

    public total(): number {

        let sum = 0;

        for (let entry of this.entries) {

            sum += entry.price;
        }

        return sum;
    }
}

export default Cart;