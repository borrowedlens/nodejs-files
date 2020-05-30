const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addToCart = (id, price) => {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err && fileContent.length != 0) {
                cart = JSON.parse(fileContent);
            }
            const updatedProductIndex = cart.products.findIndex(
                p => p.id === id
            );
            let updatedProduct;
            if (updatedProductIndex != -1) {
                updatedProduct = cart.products[updatedProductIndex];
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products[updatedProductIndex] = updatedProduct;
            } else {
                cart.products = [...cart.products, { id: id, quantity: 1 }];
            }
            cart.totalPrice = cart.totalPrice + +price;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    };
    static deleteById = (product) => {
        fs.readFile(p, (err, fileContent) => {
            if (err || fileContent.length === 0) {
                return;
            }
            let cart = JSON.parse(fileContent);
            cart.products = cart.products.filter(p => p.id !== product.id);
            cart.totalPrice = cart.totalPrice - product.price * product.quantity;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    };
    static fetchCart = cb => {
        fs.readFile(p, (err, fileContent) => {
            if (err || fileContent.length === 0) {
                cb([]);
            } else {
                cb(JSON.parse(fileContent));
            }
        });
    }
};
