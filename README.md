# Burger Town

A playful single-page burger-ordering app. Pick a burger, drink, and fries — choose sizes and toppings, build your order, and watch the total update live. Built with vanilla JavaScript and an object-oriented design.

![Burger Town screenshot](screenshot.png)

## Features

- Build a custom order across burgers, drinks, and fries, each with sizes and toppings
- Live running total that updates as items are added or removed
- Remove individual items or clear the entire order
- Friendly empty-state messaging
- Fully responsive — the layout stacks cleanly on mobile

## Built With

- **HTML5** — semantic, accessible structure
- **CSS3** — custom properties (variables), Flexbox, responsive media queries, and load animations
- **JavaScript (ES6+)** — classes, ES modules (`import` / `export`), DOM manipulation, and event handling

## What This Project Demonstrates

- **Object-oriented design** — `MenuItem` and `Order` classes that model the data cleanly
- **Separation of concerns** — logic split across focused modules instead of one large file
- **Dynamic rendering** — the order list and total are built and updated entirely through the DOM
- **Event-driven UI** — add, remove, and clear actions wired through event listeners
- **Responsive, accessible markup** — labeled inputs, alt text, and a mobile-friendly layout

## Run It Locally

This app uses ES modules, so it must be **served** rather than opened directly as a file.

```bash
npm install -g http-server
cd burger-town
http-server
```

Then open <http://localhost:8080> in your browser.

## Live Demo

[View the live site](#) <!-- replace # with your GitHub Pages link after deploying -->

## Author

Built by **Kalypso** — [github.com/Kalypso25](https://github.com/Kalypso25)
