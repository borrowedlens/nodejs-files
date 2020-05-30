const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchProducts(products => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Home',
            path: '/'
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchProducts(products => {
        res.render('shop/products', {
            prods: products,
            docTitle: 'Products',
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            docTitle: 'Product Details',
            path: '/products'
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.fetchCart(cart => {
        Product.fetchProducts(products => {
            let cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        quantity: cartProductData.quantity
                    });
                }
                console.log(cartProducts);
            }
            res.render('shop/cart', {
                docTitle: 'Cart',
                path: '/cart',
                products: cartProducts, 
                totalPrice: cart.totalPrice
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.addToCart(productId, product.price);
    });
    res.redirect('/cart');
};

exports.deleteCartItem = (req, res, next) => {
    const id = req.body.productId;
    Product.findById(id, product => {
        Cart.deleteById(product);
        res.redirect('/cart');
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'Cart',
        path: '/order'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout'
    });
};
