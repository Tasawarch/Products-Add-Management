const express = require("express");
const productController = require("./controller");

console.log('Products routes loaded');

const router = express.Router();

// POST /api/products/ → create new product
router.post("/", productController.createItem);

// GET /api/products/ → get all products
router.get("/", productController.getItems);

module.exports = router;
