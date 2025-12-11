# Inventory Manager

This project is meant to serve as an inventory manager, allowing the user to create inventory entries and get reminders for items which are out of stock.

## Base features:
- [x] Add items to your inventory, specifying your current stock of the item if desired
- [x] Give your items premade or custom tags
- [x] Search through your inventory by name or by tags
- [x] Set a minimum stock of an item you wish to maintain
- [x] See a shopping list with items which have gone below their minimum stock
minimum stock
- [x] Client-side storage of inventory (i.e. per-browser)
- [x] Mobile-friendly design.

## Goal features:
- [ ] Add items to your inventory by taking a picture of them
- [ ] Suggest a name for items added by picture (object classification
model AND/OR barcode scanner)
- [ ] Suggest tags for items added by picture (word2vec similarity?)
- [x] Search through your inventory by name (fuzzy search)
- [ ] Server-side storage of inventory (log in via email???)

# For the student working on this (me)

- `npm run dev` to see in browser with live reload
- `npm run build` before each push to ensure the website is properly shown on GitHub

This project uses https://www.fusejs.io/ for fuzzy search in the search bar

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
