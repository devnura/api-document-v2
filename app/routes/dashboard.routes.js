const express = require("express");
const router = express.Router();
const auth = require("../middleware/jwt.middleware");
const controller = require("../modules/dashboard/dashboard.controller");


// ============================== USER ==============================

router.get(
  "/",
  auth.authenticateToken,
  controller.findAll
);


module.exports = router;
