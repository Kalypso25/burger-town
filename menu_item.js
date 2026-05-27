// MenuItem class - one item on the menu (burger, drink, or fries)

class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.toppings = [];
    }

    // add a topping to the item
    addTopping(topping) {
        this.toppings.push(topping);
    }

    // get the name and price as a string
    getDisplay() {
        return this.name + " - $" + this.price.toFixed(2);
    }
}

export default MenuItem;
