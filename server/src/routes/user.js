const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
} = require("../controlers/user");

const validateRegisterBody = require("../middelware/validateRegister");
const validateLogin = require("../middelware/validateLogin");
const router = express.Router();

router
    .route("/register")
    .post(validateRegisterBody, registerUser);

router
    .route("/login")
    .post(validateLogin, loginUser)

router
    .route("/logout")
    .post(logOutUser)

router
     .route("/refresh-token")
     .post( refreshAccessToken); 

module.exports = router;
