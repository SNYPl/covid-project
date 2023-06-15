const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUp");

router.post("/registration", signUpController.postSignUp);

router.post("/verifyMail", signUpController.sendVerifyMail);

router.put("/verified/:token", signUpController.verifyAccount);

module.exports = router;
