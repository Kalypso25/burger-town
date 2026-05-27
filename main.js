// main.js - imports the classes and runs the app

import MenuItem from "./menu_item.js";
import Order from "./order.js";

// prices for burgers
const burgerPrices = {
    "Regular": { "Single": 5.00, "Double": 7.00 },
    "Cheese": { "Single": 6.00, "Double": 8.00 }
};

// prices for drinks
const drinkPrices = {
    "Water": { "Small": 0.00, "Medium": 0.00, "Large": 0.00 },
    "Tea": { "Small": 1.50, "Medium": 2.00, "Large": 2.50 },
    "Soda": { "Small": 2.75, "Medium": 3.25, "Large": 3.75 }
};

// prices for fries
const friesPrices = {
    "Regular": { "Small": 2.00, "Medium": 3.00, "Large": 3.50 },
    "Curly": { "Small": 2.75, "Medium": 3.25, "Large": 3.75 }
};

// the order object - holds all items
const order = new Order();


// helper - get the value of the checked radio button
function getRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}

// helper - get a list of checked toppings
function getCheckedToppings() {
    const boxes = document.getElementsByName("topping");
    const list = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            list.push(boxes[i].value);
        }
    }
    return list;
}


// build a burger and add it to the order
function addBurger() {
    let type = getRadioValue("burger-type");
    let size = getRadioValue("burger-size");
    const toppings = getCheckedToppings();

    // if no type AND no size, don't add a burger (even if toppings are checked)
    if (type === null && size === null) {
        return;
    }

    // apply defaults if only one was picked
    if (type === null) {
        type = "Regular";
    }
    if (size === null) {
        size = "Single";
    }

    const price = burgerPrices[type][size];

    // build the name (like "single cheeseburger" or "double burger")
    let name;
    if (type === "Cheese") {
        name = size.toLowerCase() + " cheeseburger";
    } else {
        name = size.toLowerCase() + " burger";
    }

    const burger = new MenuItem(name, price);

    // add each topping
    for (let i = 0; i < toppings.length; i++) {
        burger.addTopping(toppings[i]);
    }

    order.addItem(burger);
}

// build a drink and add it to the order
function addDrink() {
    let type = getRadioValue("drink-type");
    let size = getRadioValue("drink-size");

    // skip if nothing was picked
    if (type === null && size === null) {
        return;
    }

    // defaults
    if (type === null) {
        type = "Water";
    }
    if (size === null) {
        size = "Small";
    }

    const price = drinkPrices[type][size];
    const name = size.toLowerCase() + " " + type.toLowerCase();

    const drink = new MenuItem(name, price);
    order.addItem(drink);
}

// build fries and add them to the order
function addFries() {
    let type = getRadioValue("fries-type");
    let size = getRadioValue("fries-size");

    // skip if nothing was picked
    if (type === null && size === null) {
        return;
    }

    // defaults
    if (type === null) {
        type = "Regular";
    }
    if (size === null) {
        size = "Small";
    }

    const price = friesPrices[type][size];

    let name;
    if (type === "Curly") {
        name = size.toLowerCase() + " curly fries";
    } else {
        name = size.toLowerCase() + " fries";
    }

    const fries = new MenuItem(name, price);
    order.addItem(fries);
}


// show the current order on the page
function displayOrder() {
    const orderList = document.getElementById("order-list");
    const totalP = document.getElementById("total");
    orderList.innerHTML = "";

    // empty state - shown when there are no items yet
    if (order.items.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Your order is empty \u2014 pick some items and hit Add Order.";
        orderList.appendChild(empty);
        totalP.textContent = "";
        return;
    }

    for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];

        // wrapper for the item
        const itemDiv = document.createElement("div");
        itemDiv.className = "order-item";

        // name and price line
        const nameP = document.createElement("p");
        nameP.className = "order-item-name";
        nameP.textContent = item.getDisplay();
        itemDiv.appendChild(nameP);

        // toppings list (only if there are toppings)
        if (item.toppings.length > 0) {
            const ul = document.createElement("ul");
            ul.className = "toppings-list";
            for (let j = 0; j < item.toppings.length; j++) {
                const li = document.createElement("li");
                li.textContent = item.toppings[j];
                ul.appendChild(li);
            }
            itemDiv.appendChild(ul);
        }

        // remove button - takes this one item back out of the order
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function () {
            order.removeItem(i);
            displayOrder();
        });
        itemDiv.appendChild(removeBtn);

        orderList.appendChild(itemDiv);
    }

    totalP.textContent = "Total: $" + order.getTotal().toFixed(2);
}


// reset all the radio buttons and checkboxes
function clearForm() {
    const radios = document.querySelectorAll("input[type=radio]");
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
    const boxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].checked = false;
    }
}


// hook up the buttons when the page loads
document.addEventListener("DOMContentLoaded", function () {

    // show the auto-updating year in the footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // show the empty state right away
    displayOrder();

    document.getElementById("add-order").addEventListener("click", function () {
        addBurger();
        addDrink();
        addFries();
        displayOrder();
        clearForm();
    });

    document.getElementById("clear-order").addEventListener("click", function () {
        order.clearOrder();
        displayOrder();
        clearForm();
    });

});