const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true });

// Product model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String
});
const Product = mongoose.model('Product', productSchema);

// Sample data insertion can be done separately via MongoDB Compass or scripts

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(5000, () => console.log('Server running on port 5000'));
