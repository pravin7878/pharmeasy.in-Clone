const express = require("express");
const { registerOrganizer } = require("../controlers/user");
const validateRegisterBody = require("../middelware/validateRegister");
const router = express.Router();

router.post("/register", validateRegisterBody, registerOrganizer);

module.exports = router;
