const express = require("express");
const { registerAdmin } = require("../controlers/user");
const validateRegisterBody = require("../middelware/validateRegister");
const router = express.Router();

router.post("/register", validateRegisterBody, registerAdmin);

module.exports = router;
