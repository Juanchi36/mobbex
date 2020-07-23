const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({
    status: 'Product saved'
  });
});

router.put('/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Product Updated'
  });
});

router.delete('/:productId', async (req, res) => {
  await Product.findByIdAndRemove(req.params.productId);
  res.json({
    status: 'Product deleted'
  });
});

module.exports = router;
