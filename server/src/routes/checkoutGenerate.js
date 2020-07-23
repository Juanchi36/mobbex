const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const datos = JSON.stringify(req.body);
  const config = {
    headers: {
      'x-api-key': process.env.X_API_KEY,
      'x-access-token': process.env.X_ACCESS_TOKEN,
      'x-lang': 'es',
      'Content-Type': 'application/json'
    }
  }
  await axios.post(process.env.CHECKOUT_URL, datos, config)
    .then(result => {
      res.json(result.data);
    })
    .catch(e => { res.json(e) })
});

module.exports = router;
