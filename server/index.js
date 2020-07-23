require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });

// settings
app.set('port', 3001);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', require('./src/routes/products'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/payOrderGenerate', require('./src/routes/payOrderGenerate'));
app.use('/api/checkoutGenerate', require('./src/routes/checkoutGenerate'));
app.use('/api/hook-listener', require('./src/routes/hookListener'));

// listenning on port
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
