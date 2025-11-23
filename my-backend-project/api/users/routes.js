const express = require("express");
const userController = require("./controller"); // Ensure the correct path

const router = express.Router();
console.log('users')
router.post("/", userController.register);
router.post("/login", userController.login);



module.exports = router;
