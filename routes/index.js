var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const STRINGS = require("../utils/texts");

/* GET welcome message. */
router.get("/", function (req, res, next) {
  res.json({ message: "welcome to supabase!" });
});

//appointment routes
// router.use("/appointments",auth(),require('./appointments'))
//auth routes
router.use("/auth", require("./user.auth"));
// appointments routes
router.use("/appointments", auth(), require("./appointment.route"));
//shop routes
router.use("/shop", auth(), require("./shop.route"));
// review routes
router.use("/review", auth(), require("./review.route"));

module.exports = router;
