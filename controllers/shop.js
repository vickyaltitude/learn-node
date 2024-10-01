const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  
  Product.fetchAll()
  .then(([rows])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err))
 
};


exports.getProduct = (req, res, next) => {
  let getId = req.params.productId;
  Product.findbyId(getId)
  .then(([products]) =>{
    res.render('shop/product-detail',{
      product: products[0],
      pageTitle : products.title,
      path: '/products'
    })
  })
  .catch(err => console.log(err))
  
};

exports.postCart = (req,res,next) =>{
   let prodId = req.body.productId;
    Product.findbyId(prodId, product =>{
       Cart.addProduct(prodId,product.price)
    })
   res.redirect('/cart')
}


exports.getIndex = (req, res, next) => {
Product.fetchAll()
  .then(([rows,fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(error =>{
    console.log(error)
  })
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
