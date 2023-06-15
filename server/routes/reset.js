const express = require("express");
const router = express.Router();
const resetController = require("../controllers/reset");

router.post("/password/reset/sendMail", resetController.sendResetEmail);

router.patch("/password/reset/:email", resetController.updatePassword);

module.exports = router;
