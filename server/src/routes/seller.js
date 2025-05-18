const express = require("express");
const { registerSeller } = require("../controlers/user");
const validateRegisterBody = require("../middelware/validateRegister");
const router = express.Router();

router.post("/register", validateRegisterBody, registerSeller);

module.exports = router;