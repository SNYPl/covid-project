const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const checkAuth = require("../middleware/authentication");

// router.use(checkAuth);

router.post("/login", loginController.postLogin);

// router.get("/login", checkAuth, loginController.getLogin);

module.exports = router;
