const Item = require("./schema");

// Create a new item for a specific user
const createItem = async (itemData, userId) => {
  const newItem = new Item({ ...itemData, user: userId }); // 🔹 attach user
  return await newItem.save();
};

// Get items for a specific user or all items when userId is not provided
const getItems = async (userId) => {
  if (userId) {
    return await Item.find({ user: userId }); // filter by user
  }
  return await Item.find(); // return all items when no userId
};

module.exports = { createItem, getItems };
