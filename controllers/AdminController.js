const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/product-details', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        edit: false
        // activeProduct: true, // For handlebars
        // productCss: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/product-details', {
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            edit: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(
        id,
        updatedTitle,
        updatedImageUrl,
        updatedPrice,
        updatedDescription
    );
    updatedProduct.save();
    res.redirect('product-list');
};

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productId;
    Product.deleteById(id);
    res.redirect('product-list');
};

exports.getProductList = (req, res, next) => {
    Product.fetchProducts(products => {
        res.render('admin/product-list', {
            prods: products,
            docTitle: 'Product-list: Admin',
            path: '/admin/product-list'
        });
    });
};
