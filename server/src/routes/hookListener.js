const express = require('express');
const router = express.Router();

const Payment = require('../models/Payment');

router.get('/', async (req, res) => {
  const payments = await Payment.find({});
  res.json(payments);
});

router.post('/', async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.json({
    status: 'Payment saved'
  });
});

router.delete('/:paymentId', async (req, res) => {
  await Payment.findByIdAndRemove(req.params.paymentId);
  res.json({
    status: 'Payment deleted'
  });
});

module.exports = router;
