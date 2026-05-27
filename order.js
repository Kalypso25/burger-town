// Order class - holds all the items in the current order

class Order {
    constructor() {
        this.items = [];
    }

    // add a MenuItem to the order
    addItem(item) {
        this.items.push(item);
    }

    // remove a single item by its position in the list
    removeItem(index) {
        this.items.splice(index, 1);
    }

    // remove all items from the order
    clearOrder() {
        this.items = [];
    }

    // add up the prices of all items
    getTotal() {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += this.items[i].price;
        }
        return total;
    }
}

export default Order;