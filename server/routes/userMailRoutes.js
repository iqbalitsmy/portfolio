const express = require("express");
const router = express.Router();
const { sendMailRoute } = require("../controllers/userMailController");

// mail router
router.route("/").post(sendMailRoute);

module.exports = router;