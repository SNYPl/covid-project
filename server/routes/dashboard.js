const express = require("express");
const router = express.Router();
const { dashboard } = require("../controllers/dashboard");
const authorization = require("../middleware/authentication");

// router.get("/", authorization.authorization, dashboard.dashboard);
router.get("/dashboard", dashboard);

module.exports = router;
