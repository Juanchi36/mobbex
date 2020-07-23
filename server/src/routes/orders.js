const express = require('express');
const router = express.Router();

const Order = require('../models/Order');

router.get('/', async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({
    status: 'Order saved'
  });
});

router.put('/:id', async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Order Updated'
  });
});

router.delete('/:orderId', async (req, res) => {
  await Order.findByIdAndRemove(req.params.orderId);
  res.json({
    status: 'Order deleted'
  });
});

module.exports = router;
