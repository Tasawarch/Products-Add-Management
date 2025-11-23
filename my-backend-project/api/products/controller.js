const itemService = require("./service");

// Create a new product (attach user from req.user)
const createItem = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : undefined; // support unauthenticated requests
    const newItem = await itemService.createItem(req.body, userId);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products (for logged-in user or all products if unauthenticated)
const getItems = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : undefined; // support unauthenticated requests
    const items = await itemService.getItems(userId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
};
