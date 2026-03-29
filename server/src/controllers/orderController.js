const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    try {
      const productFreq = {};
      orderItems.forEach(item => {
        productFreq[item._id] = (productFreq[item._id] || 0) + 1;
      });
      const products = Object.keys(productFreq).map(id => ({
        productId: id,
        quantity: productFreq[id]
      }));

      const order = new Order({
        userId: req.user._id,
        products: products,
        totalAmount: totalPrice
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders };
