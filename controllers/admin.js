const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => console.log(result)).catch(error => console.log(error))
  
};

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
     return res.redirect('/')
  }
  const prodId = req.params.productId;

  Product.findByPk(prodId).then(products => {
    if (!products) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: products
    });
  }).catch(err => console.log(err))
  

};



exports.getProducts = (req, res, next) => {

  Product.findAll()
  .then(products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
})
  .catch(err => console.log(err))

};
