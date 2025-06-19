const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
